SET client_encoding = 'UTF8';

INSERT INTO fee_category (name, "createdAt", "updatedAt") VALUES
    ('Parking', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Transports en commun', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Repas', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Frais kilométriques', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Essence', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Divers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO place_category (name, "createdAt", "updatedAt") VALUES
    ('Bureau', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Home Office', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Déplacement professionnel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      
INSERT INTO compliance_check (id_compliance_check, name, description, function_code, "createdAt", "updatedAt")
VALUES 
    (1, 'Heures Maximales Quotidiennes', 'Le nombre d''heures maximal par jour.', 'DAILY_HOUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Heures Maximales Hebdomadaires', 'Le nombre d''heures maximal par semaine (lundi à dimanche).', 'HEBDO_HOUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Heures Maximales Mensuelles', 'Le nombre d''heures maximal par mois.', 'MONTHLY_HOUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Temps de Pause Quotidienne', 'Cumul des pauses au cours de la journée, avec une durée minimale pour la plus longue pause.', 'DAILY_BREAK', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Temps Minimal entre Fin et Début', 'Temps minimal entre la fin de la journée de travail précédente et le début de la journée actuelle.', 'REST_PERIOD', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Durée Maximale d''un Bloc de Travail', 'Durée maximale d''un bloc de travail continu sans pause.', 'WORK_BLOCK', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'Minimum de Jours de Repos par Semaine', 'Nombre minimum de jours de repos par semaine.', 'DAYS_OFF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO compliance_check_parameter (id_parameter, id_compliance_check, name, type, "createdAt", "updatedAt")
VALUES
    -- Heures maximales quotidiennes
    (1, 1, 'Max Daily Hours', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Heures maximales hebdomadaires
    (2, 2, 'Max Weekly Hours', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Heures maximales mensuelles
    (3, 3, 'Max Monthly Hours', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Temps de pause quotidienne
    (4, 4, 'Min Daily Breaks', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 4, 'Min Longest Break', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
   
    -- Temps minimal entre la fin de journée de travail et le début de la journée suivante
    (6, 5, 'Min Rest Between Days', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Durée maximale d’un bloc de travail sans pause
    (7, 6, 'Max Work Block Duration', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Minimum de jours de repos par semaine
    (8, 7, 'Min Days Off Per Week', 'number', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Test User
INSERT INTO "user" (id_user, first_name, last_name, role, mail, phone, password, num_address, street_address, city_address, area_code_address, region_address, country_address, is_admin, is_sup_admin, last_connected, "createdAt", "updatedAt")
VALUES
(1, 'John', 'Doe', 'Employee', 'john.doe@example.com', '1234567890', 'password123', '1', 'Main Street', 'Sample City', '12345', 'Sample Region', 'Sample Country', FALSE, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- function to create next month timetables
CREATE OR REPLACE FUNCTION create_next_month_timetables(id_user INTEGER)
RETURNS VOID AS $$
DECLARE
    next_month DATE := DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';
    month_start DATE := DATE_TRUNC('month', next_month);
    month_end DATE := (DATE_TRUNC('month', next_month) + INTERVAL '1 month - 1 day')::DATE;
    current_day DATE;
    day_of_week INTEGER;
    status TEXT;
    new_timetable_id INTEGER;
    daily_timetable_id INTEGER;
BEGIN
    -- Insérer le mensal time table pour le mois suivant
    INSERT INTO mensual_timetable_sheet (id_user, month, year, status, "createdAt", "updatedAt")
    VALUES (id_user, EXTRACT(MONTH FROM next_month), EXTRACT(YEAR FROM next_month), 'À compléter', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING id_timetable INTO new_timetable_id;

    -- Créer les daily time tables pour chaque jour du mois suivant
    current_day := month_start;
    WHILE current_day <= month_end LOOP
        -- Calculer le jour de la semaine (1 = lundi, 7 = dimanche)
        day_of_week := EXTRACT(DOW FROM current_day);

        -- Déterminer le statut par défaut (week-end ou travaillé)
        IF day_of_week IN (6, 0) THEN -- 6 = samedi, 0 = dimanche
            status := 'Week-end';
        ELSE
            status := 'Travaillé';
        END IF;

        -- Insérer le daily timetable sheet
        INSERT INTO daily_timetable_sheet (id_timetable, day, status, on_call_duty,is_completed, "createdAt", "updatedAt")
        VALUES (new_timetable_id, current_day, status::enum_daily_timetable_sheet_status, FALSE,FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id_daily_timetable INTO daily_timetable_id;

        -- Si le statut est 'Travaillé', insérer deux timeslots par défaut
        IF status = 'Travaillé' THEN
            INSERT INTO time_slot (id_daily_time, id_place_category, start, "end", "createdAt", "updatedAt")
            VALUES 
                (daily_timetable_id, 1, '08:00', '12:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                (daily_timetable_id, 1, '13:00', '18:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
        END IF;

        -- Avancer d'un jour
        current_day := current_day + INTERVAL '1 day';
    END LOOP;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_timetables_for_all_users()
RETURNS VOID AS $$
DECLARE
    user_id INTEGER;
BEGIN
    FOR user_id IN SELECT id_user FROM "user" LOOP
        PERFORM create_next_month_timetables(user_id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;


-- SELECT create_timetables_for_all_users();