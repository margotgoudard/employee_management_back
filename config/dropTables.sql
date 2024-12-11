--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-12-11 17:18:21

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
SET default_tablespace = '';

SET default_table_access_method = heap;