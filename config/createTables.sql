--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-12-13 10:32:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_permission DROP CONSTRAINT IF EXISTS user_permission_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public.user_permission DROP CONSTRAINT IF EXISTS user_permission_id_permission_fkey;
ALTER TABLE IF EXISTS ONLY public.user_compliance_check DROP CONSTRAINT IF EXISTS user_compliance_check_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public.user_compliance_check DROP CONSTRAINT IF EXISTS user_compliance_check_id_compliance_check_fkey;
ALTER TABLE IF EXISTS ONLY public.time_slot DROP CONSTRAINT IF EXISTS time_slot_id_place_category_fkey;
ALTER TABLE IF EXISTS ONLY public.time_slot DROP CONSTRAINT IF EXISTS time_slot_id_daily_time_fkey;
ALTER TABLE IF EXISTS ONLY public.subordination DROP CONSTRAINT IF EXISTS subordination_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public.subordination DROP CONSTRAINT IF EXISTS subordination_id_manager_fkey;
ALTER TABLE IF EXISTS ONLY public.subordination DROP CONSTRAINT IF EXISTS subordination_id_department_fkey;
ALTER TABLE IF EXISTS ONLY public.notification DROP CONSTRAINT IF EXISTS notification_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public.mensual_timetable_sheet DROP CONSTRAINT IF EXISTS mensual_timetable_sheet_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_report DROP CONSTRAINT IF EXISTS expense_report_id_fee_category_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_report DROP CONSTRAINT IF EXISTS expense_report_id_daily_timetable_fkey;
ALTER TABLE IF EXISTS ONLY public.document DROP CONSTRAINT IF EXISTS document_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public.document DROP CONSTRAINT IF EXISTS document_id_document_category_fkey;
ALTER TABLE IF EXISTS ONLY public.department DROP CONSTRAINT IF EXISTS department_id_sup_department_fkey;
ALTER TABLE IF EXISTS ONLY public.department DROP CONSTRAINT IF EXISTS department_id_company_fkey;
ALTER TABLE IF EXISTS ONLY public.daily_timetable_sheet DROP CONSTRAINT IF EXISTS daily_timetable_sheet_id_timetable_fkey;
ALTER TABLE IF EXISTS ONLY public.compliance_check_parameter DROP CONSTRAINT IF EXISTS compliance_check_parameter_id_compliance_check_fkey;
ALTER TABLE IF EXISTS ONLY public.audit DROP CONSTRAINT IF EXISTS audit_id_user_fkey;
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE IF EXISTS ONLY public.user_permission DROP CONSTRAINT IF EXISTS user_permission_pkey;
ALTER TABLE IF EXISTS ONLY public.user_compliance_check DROP CONSTRAINT IF EXISTS user_compliance_check_pkey;
ALTER TABLE IF EXISTS ONLY public.time_slot DROP CONSTRAINT IF EXISTS time_slot_pkey;
ALTER TABLE IF EXISTS ONLY public.subordination DROP CONSTRAINT IF EXISTS subordination_pkey;
ALTER TABLE IF EXISTS ONLY public.place_category DROP CONSTRAINT IF EXISTS place_category_pkey;
ALTER TABLE IF EXISTS ONLY public.permission DROP CONSTRAINT IF EXISTS permission_pkey;
ALTER TABLE IF EXISTS ONLY public.notification DROP CONSTRAINT IF EXISTS notification_pkey;
ALTER TABLE IF EXISTS ONLY public.mensual_timetable_sheet DROP CONSTRAINT IF EXISTS mensual_timetable_sheet_pkey;
ALTER TABLE IF EXISTS ONLY public.fee_category DROP CONSTRAINT IF EXISTS fee_category_pkey;
ALTER TABLE IF EXISTS ONLY public.expense_report DROP CONSTRAINT IF EXISTS expense_report_pkey;
ALTER TABLE IF EXISTS ONLY public.document DROP CONSTRAINT IF EXISTS document_pkey;
ALTER TABLE IF EXISTS ONLY public.document_category DROP CONSTRAINT IF EXISTS document_category_pkey;
ALTER TABLE IF EXISTS ONLY public.department DROP CONSTRAINT IF EXISTS department_pkey;
ALTER TABLE IF EXISTS ONLY public.daily_timetable_sheet DROP CONSTRAINT IF EXISTS daily_timetable_sheet_pkey;
ALTER TABLE IF EXISTS ONLY public.compliance_check DROP CONSTRAINT IF EXISTS compliance_check_pkey;
ALTER TABLE IF EXISTS ONLY public.compliance_check_parameter DROP CONSTRAINT IF EXISTS compliance_check_parameter_pkey;
ALTER TABLE IF EXISTS ONLY public.company DROP CONSTRAINT IF EXISTS company_pkey;
ALTER TABLE IF EXISTS ONLY public.audit DROP CONSTRAINT IF EXISTS audit_pkey;
ALTER TABLE IF EXISTS public.user_compliance_check ALTER COLUMN id_user_compliance_check DROP DEFAULT;
ALTER TABLE IF EXISTS public."user" ALTER COLUMN id_user DROP DEFAULT;
ALTER TABLE IF EXISTS public.time_slot ALTER COLUMN id_time_slot DROP DEFAULT;
ALTER TABLE IF EXISTS public.subordination ALTER COLUMN id_subordination DROP DEFAULT;
ALTER TABLE IF EXISTS public.place_category ALTER COLUMN id_place_category DROP DEFAULT;
ALTER TABLE IF EXISTS public.permission ALTER COLUMN id_permission DROP DEFAULT;
ALTER TABLE IF EXISTS public.notification ALTER COLUMN id_notification DROP DEFAULT;
ALTER TABLE IF EXISTS public.mensual_timetable_sheet ALTER COLUMN id_timetable DROP DEFAULT;
ALTER TABLE IF EXISTS public.fee_category ALTER COLUMN id_fee_category DROP DEFAULT;
ALTER TABLE IF EXISTS public.expense_report ALTER COLUMN id_expense_report DROP DEFAULT;
ALTER TABLE IF EXISTS public.document_category ALTER COLUMN id_category DROP DEFAULT;
ALTER TABLE IF EXISTS public.document ALTER COLUMN id_document DROP DEFAULT;
ALTER TABLE IF EXISTS public.department ALTER COLUMN id_department DROP DEFAULT;
ALTER TABLE IF EXISTS public.daily_timetable_sheet ALTER COLUMN id_daily_timetable DROP DEFAULT;
ALTER TABLE IF EXISTS public.compliance_check_parameter ALTER COLUMN id_parameter DROP DEFAULT;
ALTER TABLE IF EXISTS public.compliance_check ALTER COLUMN id_compliance_check DROP DEFAULT;
ALTER TABLE IF EXISTS public.company ALTER COLUMN id_company DROP DEFAULT;
ALTER TABLE IF EXISTS public.audit ALTER COLUMN id_audit DROP DEFAULT;
DROP TABLE IF EXISTS public.user_permission;
DROP SEQUENCE IF EXISTS public.user_id_user_seq;
DROP SEQUENCE IF EXISTS public.user_compliance_check_id_user_compliance_check_seq;
DROP TABLE IF EXISTS public.user_compliance_check;
DROP TABLE IF EXISTS public."user";
DROP SEQUENCE IF EXISTS public.time_slot_id_time_slot_seq;
DROP TABLE IF EXISTS public.time_slot;
DROP SEQUENCE IF EXISTS public.subordination_id_subordination_seq;
DROP TABLE IF EXISTS public.subordination;
DROP SEQUENCE IF EXISTS public.place_category_id_place_category_seq;
DROP TABLE IF EXISTS public.place_category;
DROP SEQUENCE IF EXISTS public.permission_id_permission_seq;
DROP TABLE IF EXISTS public.permission;
DROP SEQUENCE IF EXISTS public.notification_id_notification_seq;
DROP TABLE IF EXISTS public.notification;
DROP SEQUENCE IF EXISTS public.mensual_timetable_sheet_id_timetable_seq;
DROP TABLE IF EXISTS public.mensual_timetable_sheet;
DROP SEQUENCE IF EXISTS public.fee_category_id_fee_category_seq;
DROP TABLE IF EXISTS public.fee_category;
DROP SEQUENCE IF EXISTS public.expense_report_id_expense_report_seq;
DROP TABLE IF EXISTS public.expense_report;
DROP SEQUENCE IF EXISTS public.document_id_document_seq;
DROP SEQUENCE IF EXISTS public.document_category_id_category_seq;
DROP TABLE IF EXISTS public.document_category;
DROP TABLE IF EXISTS public.document;
DROP SEQUENCE IF EXISTS public.department_id_department_seq;
DROP TABLE IF EXISTS public.department;
DROP SEQUENCE IF EXISTS public.daily_timetable_sheet_id_daily_timetable_seq;
DROP TABLE IF EXISTS public.daily_timetable_sheet;
DROP SEQUENCE IF EXISTS public.compliance_check_parameter_id_parameter_seq;
DROP TABLE IF EXISTS public.compliance_check_parameter;
DROP SEQUENCE IF EXISTS public.compliance_check_id_compliance_check_seq;
DROP TABLE IF EXISTS public.compliance_check;
DROP SEQUENCE IF EXISTS public.company_id_company_seq;
DROP TABLE IF EXISTS public.company;
DROP SEQUENCE IF EXISTS public.audit_id_audit_seq;
DROP TABLE IF EXISTS public.audit;
DROP FUNCTION IF EXISTS public.create_timetables_for_all_users();
DROP FUNCTION IF EXISTS public.create_next_month_timetables(id_user integer);
DROP TYPE IF EXISTS public.enum_mensual_timetable_sheet_status;
DROP TYPE IF EXISTS public.enum_daily_timetable_sheet_status;
DROP TYPE IF EXISTS public.enum_compliance_check_parameter_type;
--
-- TOC entry 884 (class 1247 OID 72001)
-- Name: enum_compliance_check_parameter_type; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.enum_compliance_check_parameter_type AS ENUM (
    'string',
    'number',
    'boolean'
);


ALTER TYPE public.enum_compliance_check_parameter_type OWNER TO "user";

--
-- TOC entry 881 (class 1247 OID 71874)
-- Name: enum_daily_timetable_sheet_status; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.enum_daily_timetable_sheet_status AS ENUM (
    'Travaillé',
    'Week-end',
    'Férié',
    'Congés payés',
    'Arrêt maladie',
    'Congés sans solde'
);


ALTER TYPE public.enum_daily_timetable_sheet_status OWNER TO "user";

--
-- TOC entry 878 (class 1247 OID 71852)
-- Name: enum_mensual_timetable_sheet_status; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.enum_mensual_timetable_sheet_status AS ENUM (
    'À compléter',
    'En attente d''approbation',
    'Acceptée'
);


ALTER TYPE public.enum_mensual_timetable_sheet_status OWNER TO "user";

--
-- TOC entry 264 (class 1255 OID 70336)
-- Name: create_next_month_timetables(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_next_month_timetables(id_user integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
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
        INSERT INTO daily_timetable_sheet (id_timetable, day, status, on_call_duty, "createdAt", "updatedAt")
        VALUES (new_timetable_id, current_day, status::enum_daily_timetable_sheet_status, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
$$;


ALTER FUNCTION public.create_next_month_timetables(id_user integer) OWNER TO postgres;

--
-- TOC entry 263 (class 1255 OID 70337)
-- Name: create_timetables_for_all_users(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_timetables_for_all_users() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    user_id INTEGER;
BEGIN
    FOR user_id IN SELECT id_user FROM "user" LOOP
        PERFORM create_next_month_timetables(user_id);
    END LOOP;
END;
$$;


ALTER FUNCTION public.create_timetables_for_all_users() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 76167)
-- Name: audit; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.audit (
    id_audit integer NOT NULL,
    table_name character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    old_values jsonb,
    new_values jsonb,
    id_user integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.audit OWNER TO "user";

--
-- TOC entry 216 (class 1259 OID 76172)
-- Name: audit_id_audit_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.audit_id_audit_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_id_audit_seq OWNER TO "user";

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 216
-- Name: audit_id_audit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.audit_id_audit_seq OWNED BY public.audit.id_audit;


--
-- TOC entry 217 (class 1259 OID 76173)
-- Name: company; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.company (
    id_company integer NOT NULL,
    name character varying(255) NOT NULL,
    num_address character varying(50),
    street_address character varying(255),
    city_address character varying(100),
    area_code_address character varying(50),
    region_address character varying(100),
    country_address character varying(100),
    logo bytea,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.company OWNER TO "user";

--
-- TOC entry 218 (class 1259 OID 76178)
-- Name: company_id_company_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.company_id_company_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_id_company_seq OWNER TO "user";

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 218
-- Name: company_id_company_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.company_id_company_seq OWNED BY public.company.id_company;


--
-- TOC entry 219 (class 1259 OID 76179)
-- Name: compliance_check; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.compliance_check (
    id_compliance_check integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(500),
    function_code character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.compliance_check OWNER TO "user";

--
-- TOC entry 220 (class 1259 OID 76184)
-- Name: compliance_check_id_compliance_check_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.compliance_check_id_compliance_check_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compliance_check_id_compliance_check_seq OWNER TO "user";

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 220
-- Name: compliance_check_id_compliance_check_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.compliance_check_id_compliance_check_seq OWNED BY public.compliance_check.id_compliance_check;


--
-- TOC entry 221 (class 1259 OID 76185)
-- Name: compliance_check_parameter; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.compliance_check_parameter (
    id_parameter integer NOT NULL,
    id_compliance_check integer NOT NULL,
    name character varying(255) NOT NULL,
    type public.enum_compliance_check_parameter_type NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.compliance_check_parameter OWNER TO "user";

--
-- TOC entry 222 (class 1259 OID 76188)
-- Name: compliance_check_parameter_id_parameter_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.compliance_check_parameter_id_parameter_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compliance_check_parameter_id_parameter_seq OWNER TO "user";

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 222
-- Name: compliance_check_parameter_id_parameter_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.compliance_check_parameter_id_parameter_seq OWNED BY public.compliance_check_parameter.id_parameter;


--
-- TOC entry 223 (class 1259 OID 76189)
-- Name: daily_timetable_sheet; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.daily_timetable_sheet (
    id_daily_timetable integer NOT NULL,
    id_timetable integer NOT NULL,
    day timestamp with time zone NOT NULL,
    status public.enum_daily_timetable_sheet_status NOT NULL,
    comment text,
    on_call_duty boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.daily_timetable_sheet OWNER TO "user";

--
-- TOC entry 224 (class 1259 OID 76194)
-- Name: daily_timetable_sheet_id_daily_timetable_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.daily_timetable_sheet_id_daily_timetable_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.daily_timetable_sheet_id_daily_timetable_seq OWNER TO "user";

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 224
-- Name: daily_timetable_sheet_id_daily_timetable_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.daily_timetable_sheet_id_daily_timetable_seq OWNED BY public.daily_timetable_sheet.id_daily_timetable;


--
-- TOC entry 225 (class 1259 OID 76195)
-- Name: department; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.department (
    id_department integer NOT NULL,
    name character varying(255) NOT NULL,
    id_sup_department integer,
    id_company integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.department OWNER TO "user";

--
-- TOC entry 226 (class 1259 OID 76198)
-- Name: department_id_department_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.department_id_department_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.department_id_department_seq OWNER TO "user";

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 226
-- Name: department_id_department_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.department_id_department_seq OWNED BY public.department.id_department;


--
-- TOC entry 227 (class 1259 OID 76199)
-- Name: document; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.document (
    id_document integer NOT NULL,
    document bytea NOT NULL,
    name character varying(255) NOT NULL,
    id_user integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_document_category integer
);


ALTER TABLE public.document OWNER TO "user";

--
-- TOC entry 228 (class 1259 OID 76204)
-- Name: document_category; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.document_category (
    id_category integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.document_category OWNER TO "user";

--
-- TOC entry 229 (class 1259 OID 76207)
-- Name: document_category_id_category_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.document_category_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.document_category_id_category_seq OWNER TO "user";

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 229
-- Name: document_category_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.document_category_id_category_seq OWNED BY public.document_category.id_category;


--
-- TOC entry 230 (class 1259 OID 76208)
-- Name: document_id_document_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.document_id_document_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.document_id_document_seq OWNER TO "user";

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 230
-- Name: document_id_document_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.document_id_document_seq OWNED BY public.document.id_document;


--
-- TOC entry 231 (class 1259 OID 76209)
-- Name: expense_report; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.expense_report (
    id_expense_report integer NOT NULL,
    id_fee_category integer NOT NULL,
    id_daily_timetable integer NOT NULL,
    amount double precision NOT NULL,
    document character varying(255),
    client character varying(255),
    motive character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.expense_report OWNER TO "user";

--
-- TOC entry 232 (class 1259 OID 76214)
-- Name: expense_report_id_expense_report_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.expense_report_id_expense_report_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expense_report_id_expense_report_seq OWNER TO "user";

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 232
-- Name: expense_report_id_expense_report_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.expense_report_id_expense_report_seq OWNED BY public.expense_report.id_expense_report;


--
-- TOC entry 233 (class 1259 OID 76215)
-- Name: fee_category; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.fee_category (
    id_fee_category integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.fee_category OWNER TO "user";

--
-- TOC entry 234 (class 1259 OID 76218)
-- Name: fee_category_id_fee_category_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.fee_category_id_fee_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fee_category_id_fee_category_seq OWNER TO "user";

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 234
-- Name: fee_category_id_fee_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.fee_category_id_fee_category_seq OWNED BY public.fee_category.id_fee_category;


--
-- TOC entry 235 (class 1259 OID 76219)
-- Name: mensual_timetable_sheet; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.mensual_timetable_sheet (
    id_timetable integer NOT NULL,
    id_user integer NOT NULL,
    month integer NOT NULL,
    year integer NOT NULL,
    comment text,
    commision double precision,
    status public.enum_mensual_timetable_sheet_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.mensual_timetable_sheet OWNER TO "user";

--
-- TOC entry 236 (class 1259 OID 76224)
-- Name: mensual_timetable_sheet_id_timetable_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.mensual_timetable_sheet_id_timetable_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensual_timetable_sheet_id_timetable_seq OWNER TO "user";

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 236
-- Name: mensual_timetable_sheet_id_timetable_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.mensual_timetable_sheet_id_timetable_seq OWNED BY public.mensual_timetable_sheet.id_timetable;


--
-- TOC entry 237 (class 1259 OID 76225)
-- Name: notification; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.notification (
    id_notification integer NOT NULL,
    content character varying(500) NOT NULL,
    viewed boolean DEFAULT false NOT NULL,
    id_user integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.notification OWNER TO "user";

--
-- TOC entry 238 (class 1259 OID 76231)
-- Name: notification_id_notification_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.notification_id_notification_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_id_notification_seq OWNER TO "user";

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 238
-- Name: notification_id_notification_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.notification_id_notification_seq OWNED BY public.notification.id_notification;


--
-- TOC entry 239 (class 1259 OID 76232)
-- Name: permission; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.permission (
    id_permission integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.permission OWNER TO "user";

--
-- TOC entry 240 (class 1259 OID 76235)
-- Name: permission_id_permission_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.permission_id_permission_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_id_permission_seq OWNER TO "user";

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 240
-- Name: permission_id_permission_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.permission_id_permission_seq OWNED BY public.permission.id_permission;


--
-- TOC entry 241 (class 1259 OID 76236)
-- Name: place_category; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.place_category (
    id_place_category integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.place_category OWNER TO "user";

--
-- TOC entry 242 (class 1259 OID 76239)
-- Name: place_category_id_place_category_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.place_category_id_place_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.place_category_id_place_category_seq OWNER TO "user";

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 242
-- Name: place_category_id_place_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.place_category_id_place_category_seq OWNED BY public.place_category.id_place_category;


--
-- TOC entry 243 (class 1259 OID 76240)
-- Name: subordination; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.subordination (
    id_subordination integer NOT NULL,
    id_department integer NOT NULL,
    id_manager integer NOT NULL,
    id_user integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.subordination OWNER TO "user";

--
-- TOC entry 244 (class 1259 OID 76243)
-- Name: subordination_id_subordination_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.subordination_id_subordination_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subordination_id_subordination_seq OWNER TO "user";

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 244
-- Name: subordination_id_subordination_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.subordination_id_subordination_seq OWNED BY public.subordination.id_subordination;


--
-- TOC entry 245 (class 1259 OID 76244)
-- Name: time_slot; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.time_slot (
    id_time_slot integer NOT NULL,
    id_daily_time integer NOT NULL,
    id_place_category integer NOT NULL,
    start time without time zone NOT NULL,
    "end" time without time zone NOT NULL,
    num_address character varying(255),
    street_address character varying(255),
    city_address character varying(255),
    area_code_address character varying(255),
    region_address character varying(255),
    country_address character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.time_slot OWNER TO "user";

--
-- TOC entry 246 (class 1259 OID 76249)
-- Name: time_slot_id_time_slot_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.time_slot_id_time_slot_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.time_slot_id_time_slot_seq OWNER TO "user";

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 246
-- Name: time_slot_id_time_slot_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.time_slot_id_time_slot_seq OWNED BY public.time_slot.id_time_slot;


--
-- TOC entry 247 (class 1259 OID 76250)
-- Name: user; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."user" (
    id_user integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    mail character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    num_address character varying(255) NOT NULL,
    street_address character varying(255) NOT NULL,
    city_address character varying(255) NOT NULL,
    area_code_address character varying(255) NOT NULL,
    region_address character varying(255) NOT NULL,
    country_address character varying(255) NOT NULL,
    is_admin boolean NOT NULL,
    is_sup_admin boolean NOT NULL,
    last_connected timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO "user";

--
-- TOC entry 248 (class 1259 OID 76255)
-- Name: user_compliance_check; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_compliance_check (
    id_user_compliance_check integer NOT NULL,
    id_compliance_check integer NOT NULL,
    id_user integer NOT NULL,
    parameters jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.user_compliance_check OWNER TO "user";

--
-- TOC entry 249 (class 1259 OID 76260)
-- Name: user_compliance_check_id_user_compliance_check_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.user_compliance_check_id_user_compliance_check_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_compliance_check_id_user_compliance_check_seq OWNER TO "user";

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 249
-- Name: user_compliance_check_id_user_compliance_check_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_compliance_check_id_user_compliance_check_seq OWNED BY public.user_compliance_check.id_user_compliance_check;


--
-- TOC entry 250 (class 1259 OID 76261)
-- Name: user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_user_seq OWNER TO "user";

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 250
-- Name: user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_id_user_seq OWNED BY public."user".id_user;


--
-- TOC entry 251 (class 1259 OID 76262)
-- Name: user_permission; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_permission (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_user integer NOT NULL,
    id_permission integer NOT NULL
);


ALTER TABLE public.user_permission OWNER TO "user";

--
-- TOC entry 4788 (class 2604 OID 76265)
-- Name: audit id_audit; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.audit ALTER COLUMN id_audit SET DEFAULT nextval('public.audit_id_audit_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 76266)
-- Name: company id_company; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.company ALTER COLUMN id_company SET DEFAULT nextval('public.company_id_company_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 76267)
-- Name: compliance_check id_compliance_check; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check ALTER COLUMN id_compliance_check SET DEFAULT nextval('public.compliance_check_id_compliance_check_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 76268)
-- Name: compliance_check_parameter id_parameter; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check_parameter ALTER COLUMN id_parameter SET DEFAULT nextval('public.compliance_check_parameter_id_parameter_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 76269)
-- Name: daily_timetable_sheet id_daily_timetable; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.daily_timetable_sheet ALTER COLUMN id_daily_timetable SET DEFAULT nextval('public.daily_timetable_sheet_id_daily_timetable_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 76270)
-- Name: department id_department; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department ALTER COLUMN id_department SET DEFAULT nextval('public.department_id_department_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 76271)
-- Name: document id_document; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document ALTER COLUMN id_document SET DEFAULT nextval('public.document_id_document_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 76272)
-- Name: document_category id_category; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document_category ALTER COLUMN id_category SET DEFAULT nextval('public.document_category_id_category_seq'::regclass);


--
-- TOC entry 4796 (class 2604 OID 76273)
-- Name: expense_report id_expense_report; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report ALTER COLUMN id_expense_report SET DEFAULT nextval('public.expense_report_id_expense_report_seq'::regclass);


--
-- TOC entry 4797 (class 2604 OID 76274)
-- Name: fee_category id_fee_category; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.fee_category ALTER COLUMN id_fee_category SET DEFAULT nextval('public.fee_category_id_fee_category_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 76275)
-- Name: mensual_timetable_sheet id_timetable; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mensual_timetable_sheet ALTER COLUMN id_timetable SET DEFAULT nextval('public.mensual_timetable_sheet_id_timetable_seq'::regclass);


--
-- TOC entry 4799 (class 2604 OID 76276)
-- Name: notification id_notification; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.notification ALTER COLUMN id_notification SET DEFAULT nextval('public.notification_id_notification_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 76277)
-- Name: permission id_permission; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permission ALTER COLUMN id_permission SET DEFAULT nextval('public.permission_id_permission_seq'::regclass);


--
-- TOC entry 4802 (class 2604 OID 76278)
-- Name: place_category id_place_category; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.place_category ALTER COLUMN id_place_category SET DEFAULT nextval('public.place_category_id_place_category_seq'::regclass);


--
-- TOC entry 4803 (class 2604 OID 76279)
-- Name: subordination id_subordination; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination ALTER COLUMN id_subordination SET DEFAULT nextval('public.subordination_id_subordination_seq'::regclass);


--
-- TOC entry 4804 (class 2604 OID 76280)
-- Name: time_slot id_time_slot; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot ALTER COLUMN id_time_slot SET DEFAULT nextval('public.time_slot_id_time_slot_seq'::regclass);


--
-- TOC entry 4805 (class 2604 OID 76281)
-- Name: user id_user; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user" ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);


--
-- TOC entry 4806 (class 2604 OID 76282)
-- Name: user_compliance_check id_user_compliance_check; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check ALTER COLUMN id_user_compliance_check SET DEFAULT nextval('public.user_compliance_check_id_user_compliance_check_seq'::regclass);


--
-- TOC entry 5008 (class 0 OID 76167)
-- Dependencies: 215
-- Data for Name: audit; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.audit (id_audit, table_name, action, old_values, new_values, id_user, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5010 (class 0 OID 76173)
-- Dependencies: 217
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.company (id_company, name, num_address, street_address, city_address, area_code_address, region_address, country_address, logo, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5012 (class 0 OID 76179)
-- Dependencies: 219
-- Data for Name: compliance_check; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.compliance_check (id_compliance_check, name, description, function_code, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5014 (class 0 OID 76185)
-- Dependencies: 221
-- Data for Name: compliance_check_parameter; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.compliance_check_parameter (id_parameter, id_compliance_check, name, type, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5016 (class 0 OID 76189)
-- Dependencies: 223
-- Data for Name: daily_timetable_sheet; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.daily_timetable_sheet (id_daily_timetable, id_timetable, day, status, comment, on_call_duty, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5018 (class 0 OID 76195)
-- Dependencies: 225
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.department (id_department, name, id_sup_department, id_company, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5020 (class 0 OID 76199)
-- Dependencies: 227
-- Data for Name: document; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.document (id_document, document, name, id_user, "createdAt", "updatedAt", id_document_category) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 76204)
-- Dependencies: 228
-- Data for Name: document_category; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.document_category (id_category, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5024 (class 0 OID 76209)
-- Dependencies: 231
-- Data for Name: expense_report; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.expense_report (id_expense_report, id_fee_category, id_daily_timetable, amount, document, client, motive, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5026 (class 0 OID 76215)
-- Dependencies: 233
-- Data for Name: fee_category; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.fee_category (id_fee_category, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5028 (class 0 OID 76219)
-- Dependencies: 235
-- Data for Name: mensual_timetable_sheet; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.mensual_timetable_sheet (id_timetable, id_user, month, year, comment, commision, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5030 (class 0 OID 76225)
-- Dependencies: 237
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.notification (id_notification, content, viewed, id_user, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5032 (class 0 OID 76232)
-- Dependencies: 239
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.permission (id_permission, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5034 (class 0 OID 76236)
-- Dependencies: 241
-- Data for Name: place_category; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.place_category (id_place_category, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5036 (class 0 OID 76240)
-- Dependencies: 243
-- Data for Name: subordination; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.subordination (id_subordination, id_department, id_manager, id_user, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5038 (class 0 OID 76244)
-- Dependencies: 245
-- Data for Name: time_slot; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.time_slot (id_time_slot, id_daily_time, id_place_category, start, "end", num_address, street_address, city_address, area_code_address, region_address, country_address, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5040 (class 0 OID 76250)
-- Dependencies: 247
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."user" (id_user, first_name, last_name, role, mail, phone, password, num_address, street_address, city_address, area_code_address, region_address, country_address, is_admin, is_sup_admin, last_connected, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 76255)
-- Dependencies: 248
-- Data for Name: user_compliance_check; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_compliance_check (id_user_compliance_check, id_compliance_check, id_user, parameters, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5044 (class 0 OID 76262)
-- Dependencies: 251
-- Data for Name: user_permission; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_permission ("createdAt", "updatedAt", id_user, id_permission) FROM stdin;
\.


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 216
-- Name: audit_id_audit_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.audit_id_audit_seq', 1, false);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 218
-- Name: company_id_company_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.company_id_company_seq', 1, false);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 220
-- Name: compliance_check_id_compliance_check_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.compliance_check_id_compliance_check_seq', 1, false);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 222
-- Name: compliance_check_parameter_id_parameter_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.compliance_check_parameter_id_parameter_seq', 1, false);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 224
-- Name: daily_timetable_sheet_id_daily_timetable_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.daily_timetable_sheet_id_daily_timetable_seq', 1, false);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 226
-- Name: department_id_department_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.department_id_department_seq', 1, false);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 229
-- Name: document_category_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.document_category_id_category_seq', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 230
-- Name: document_id_document_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.document_id_document_seq', 1, false);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 232
-- Name: expense_report_id_expense_report_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.expense_report_id_expense_report_seq', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 234
-- Name: fee_category_id_fee_category_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.fee_category_id_fee_category_seq', 1, false);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 236
-- Name: mensual_timetable_sheet_id_timetable_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.mensual_timetable_sheet_id_timetable_seq', 1, false);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 238
-- Name: notification_id_notification_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.notification_id_notification_seq', 1, false);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 240
-- Name: permission_id_permission_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.permission_id_permission_seq', 1, false);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 242
-- Name: place_category_id_place_category_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.place_category_id_place_category_seq', 1, false);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 244
-- Name: subordination_id_subordination_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.subordination_id_subordination_seq', 1, false);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 246
-- Name: time_slot_id_time_slot_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.time_slot_id_time_slot_seq', 1, false);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 249
-- Name: user_compliance_check_id_user_compliance_check_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user_compliance_check_id_user_compliance_check_seq', 1, false);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 250
-- Name: user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user_id_user_seq', 1, false);


--
-- TOC entry 4808 (class 2606 OID 76284)
-- Name: audit audit_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT audit_pkey PRIMARY KEY (id_audit);


--
-- TOC entry 4810 (class 2606 OID 76286)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id_company);


--
-- TOC entry 4814 (class 2606 OID 76288)
-- Name: compliance_check_parameter compliance_check_parameter_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check_parameter
    ADD CONSTRAINT compliance_check_parameter_pkey PRIMARY KEY (id_parameter);


--
-- TOC entry 4812 (class 2606 OID 76290)
-- Name: compliance_check compliance_check_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check
    ADD CONSTRAINT compliance_check_pkey PRIMARY KEY (id_compliance_check);


--
-- TOC entry 4816 (class 2606 OID 76292)
-- Name: daily_timetable_sheet daily_timetable_sheet_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.daily_timetable_sheet
    ADD CONSTRAINT daily_timetable_sheet_pkey PRIMARY KEY (id_daily_timetable);


--
-- TOC entry 4818 (class 2606 OID 76294)
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id_department);


--
-- TOC entry 4822 (class 2606 OID 76296)
-- Name: document_category document_category_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document_category
    ADD CONSTRAINT document_category_pkey PRIMARY KEY (id_category);


--
-- TOC entry 4820 (class 2606 OID 76298)
-- Name: document document_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_pkey PRIMARY KEY (id_document);


--
-- TOC entry 4824 (class 2606 OID 76300)
-- Name: expense_report expense_report_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report
    ADD CONSTRAINT expense_report_pkey PRIMARY KEY (id_expense_report);


--
-- TOC entry 4826 (class 2606 OID 76302)
-- Name: fee_category fee_category_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.fee_category
    ADD CONSTRAINT fee_category_pkey PRIMARY KEY (id_fee_category);


--
-- TOC entry 4828 (class 2606 OID 76304)
-- Name: mensual_timetable_sheet mensual_timetable_sheet_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mensual_timetable_sheet
    ADD CONSTRAINT mensual_timetable_sheet_pkey PRIMARY KEY (id_timetable);


--
-- TOC entry 4830 (class 2606 OID 76306)
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id_notification);


--
-- TOC entry 4832 (class 2606 OID 76308)
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id_permission);


--
-- TOC entry 4834 (class 2606 OID 76310)
-- Name: place_category place_category_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.place_category
    ADD CONSTRAINT place_category_pkey PRIMARY KEY (id_place_category);


--
-- TOC entry 4836 (class 2606 OID 76312)
-- Name: subordination subordination_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_pkey PRIMARY KEY (id_subordination);


--
-- TOC entry 4838 (class 2606 OID 76314)
-- Name: time_slot time_slot_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot
    ADD CONSTRAINT time_slot_pkey PRIMARY KEY (id_time_slot);


--
-- TOC entry 4842 (class 2606 OID 76316)
-- Name: user_compliance_check user_compliance_check_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check
    ADD CONSTRAINT user_compliance_check_pkey PRIMARY KEY (id_user_compliance_check);


--
-- TOC entry 4844 (class 2606 OID 76318)
-- Name: user_permission user_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_permission
    ADD CONSTRAINT user_permission_pkey PRIMARY KEY (id_user, id_permission);


--
-- TOC entry 4840 (class 2606 OID 76320)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4845 (class 2606 OID 76321)
-- Name: audit audit_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT audit_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4846 (class 2606 OID 76326)
-- Name: compliance_check_parameter compliance_check_parameter_id_compliance_check_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check_parameter
    ADD CONSTRAINT compliance_check_parameter_id_compliance_check_fkey FOREIGN KEY (id_compliance_check) REFERENCES public.compliance_check(id_compliance_check) ON UPDATE CASCADE;


--
-- TOC entry 4847 (class 2606 OID 76331)
-- Name: daily_timetable_sheet daily_timetable_sheet_id_timetable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.daily_timetable_sheet
    ADD CONSTRAINT daily_timetable_sheet_id_timetable_fkey FOREIGN KEY (id_timetable) REFERENCES public.mensual_timetable_sheet(id_timetable) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4848 (class 2606 OID 76336)
-- Name: department department_id_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_id_company_fkey FOREIGN KEY (id_company) REFERENCES public.company(id_company) ON UPDATE CASCADE;


--
-- TOC entry 4849 (class 2606 OID 76341)
-- Name: department department_id_sup_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_id_sup_department_fkey FOREIGN KEY (id_sup_department) REFERENCES public.department(id_department);


--
-- TOC entry 4850 (class 2606 OID 76346)
-- Name: document document_id_document_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_id_document_category_fkey FOREIGN KEY (id_document_category) REFERENCES public.document_category(id_category) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4851 (class 2606 OID 76351)
-- Name: document document_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4852 (class 2606 OID 76356)
-- Name: expense_report expense_report_id_daily_timetable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report
    ADD CONSTRAINT expense_report_id_daily_timetable_fkey FOREIGN KEY (id_daily_timetable) REFERENCES public.daily_timetable_sheet(id_daily_timetable) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4853 (class 2606 OID 76361)
-- Name: expense_report expense_report_id_fee_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report
    ADD CONSTRAINT expense_report_id_fee_category_fkey FOREIGN KEY (id_fee_category) REFERENCES public.fee_category(id_fee_category) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4854 (class 2606 OID 76366)
-- Name: mensual_timetable_sheet mensual_timetable_sheet_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mensual_timetable_sheet
    ADD CONSTRAINT mensual_timetable_sheet_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4855 (class 2606 OID 76371)
-- Name: notification notification_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4856 (class 2606 OID 76376)
-- Name: subordination subordination_id_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_id_department_fkey FOREIGN KEY (id_department) REFERENCES public.department(id_department) ON UPDATE CASCADE;


--
-- TOC entry 4857 (class 2606 OID 76381)
-- Name: subordination subordination_id_manager_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_id_manager_fkey FOREIGN KEY (id_manager) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4858 (class 2606 OID 76386)
-- Name: subordination subordination_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4859 (class 2606 OID 76391)
-- Name: time_slot time_slot_id_daily_time_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot
    ADD CONSTRAINT time_slot_id_daily_time_fkey FOREIGN KEY (id_daily_time) REFERENCES public.daily_timetable_sheet(id_daily_timetable) ON UPDATE CASCADE;


--
-- TOC entry 4860 (class 2606 OID 76396)
-- Name: time_slot time_slot_id_place_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot
    ADD CONSTRAINT time_slot_id_place_category_fkey FOREIGN KEY (id_place_category) REFERENCES public.place_category(id_place_category) ON UPDATE CASCADE;


--
-- TOC entry 4861 (class 2606 OID 76401)
-- Name: user_compliance_check user_compliance_check_id_compliance_check_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check
    ADD CONSTRAINT user_compliance_check_id_compliance_check_fkey FOREIGN KEY (id_compliance_check) REFERENCES public.compliance_check(id_compliance_check) ON UPDATE CASCADE;


--
-- TOC entry 4862 (class 2606 OID 76406)
-- Name: user_compliance_check user_compliance_check_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check
    ADD CONSTRAINT user_compliance_check_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4863 (class 2606 OID 76411)
-- Name: user_permission user_permission_id_permission_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_permission
    ADD CONSTRAINT user_permission_id_permission_fkey FOREIGN KEY (id_permission) REFERENCES public.permission(id_permission) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4864 (class 2606 OID 76416)
-- Name: user_permission user_permission_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_permission
    ADD CONSTRAINT user_permission_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-12-13 10:32:17

--
-- PostgreSQL database dump complete
--

