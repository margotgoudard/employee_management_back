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

--
-- TOC entry 218 (class 1259 OID 71815)
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
-- TOC entry 217 (class 1259 OID 71814)
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
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 217
-- Name: audit_id_audit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.audit_id_audit_seq OWNED BY public.audit.id_audit;


--
-- TOC entry 220 (class 1259 OID 71829)
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
-- TOC entry 219 (class 1259 OID 71828)
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
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 219
-- Name: company_id_company_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.company_id_company_seq OWNED BY public.company.id_company;


--
-- TOC entry 240 (class 1259 OID 71973)
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
-- TOC entry 239 (class 1259 OID 71972)
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
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 239
-- Name: compliance_check_id_compliance_check_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.compliance_check_id_compliance_check_seq OWNED BY public.compliance_check.id_compliance_check;


--
-- TOC entry 244 (class 1259 OID 72008)
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
-- TOC entry 243 (class 1259 OID 72007)
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
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 243
-- Name: compliance_check_parameter_id_parameter_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.compliance_check_parameter_id_parameter_seq OWNED BY public.compliance_check_parameter.id_parameter;


--
-- TOC entry 228 (class 1259 OID 71888)
-- Name: daily_timetable_sheet; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.daily_timetable_sheet (
    id_daily_timetable integer NOT NULL,
    id_timetable integer NOT NULL,
    day timestamp with time zone NOT NULL,
    status public.enum_daily_timetable_sheet_status NOT NULL,
    comment text,
    on_call_duty boolean,
    is_completed boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.daily_timetable_sheet OWNER TO "user";

--
-- TOC entry 227 (class 1259 OID 71887)
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
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 227
-- Name: daily_timetable_sheet_id_daily_timetable_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.daily_timetable_sheet_id_daily_timetable_seq OWNED BY public.daily_timetable_sheet.id_daily_timetable;


--
-- TOC entry 246 (class 1259 OID 72020)
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
-- TOC entry 245 (class 1259 OID 72019)
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
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 245
-- Name: department_id_department_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.department_id_department_seq OWNED BY public.department.id_department;


--
-- TOC entry 238 (class 1259 OID 71954)
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
-- TOC entry 236 (class 1259 OID 71947)
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
-- TOC entry 235 (class 1259 OID 71946)
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
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 235
-- Name: document_category_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.document_category_id_category_seq OWNED BY public.document_category.id_category;


--
-- TOC entry 237 (class 1259 OID 71953)
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
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 237
-- Name: document_id_document_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.document_id_document_seq OWNED BY public.document.id_document;


--
-- TOC entry 230 (class 1259 OID 71902)
-- Name: expense_report; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.expense_report (
    id_expense_report integer NOT NULL,
    id_fee_category integer NOT NULL,
    id_daily_timetable integer NOT NULL,
    amount double precision NOT NULL,
    document_name character varying(255),
    document bytea,
    client character varying(255),
    motive character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.expense_report OWNER TO "user";

--
-- TOC entry 229 (class 1259 OID 71901)
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
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 229
-- Name: expense_report_id_expense_report_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.expense_report_id_expense_report_seq OWNED BY public.expense_report.id_expense_report;


--
-- TOC entry 222 (class 1259 OID 71838)
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
-- TOC entry 221 (class 1259 OID 71837)
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
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 221
-- Name: fee_category_id_fee_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.fee_category_id_fee_category_seq OWNED BY public.fee_category.id_fee_category;


--
-- TOC entry 226 (class 1259 OID 71860)
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
-- TOC entry 225 (class 1259 OID 71859)
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
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 225
-- Name: mensual_timetable_sheet_id_timetable_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.mensual_timetable_sheet_id_timetable_seq OWNED BY public.mensual_timetable_sheet.id_timetable;


--
-- TOC entry 248 (class 1259 OID 72037)
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
-- TOC entry 247 (class 1259 OID 72036)
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
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 247
-- Name: notification_id_notification_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.notification_id_notification_seq OWNED BY public.notification.id_notification;


--
-- TOC entry 234 (class 1259 OID 71940)
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
-- TOC entry 233 (class 1259 OID 71939)
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
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 233
-- Name: permission_id_permission_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.permission_id_permission_seq OWNED BY public.permission.id_permission;


--
-- TOC entry 224 (class 1259 OID 71845)
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
-- TOC entry 223 (class 1259 OID 71844)
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
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 223
-- Name: place_category_id_place_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.place_category_id_place_category_seq OWNED BY public.place_category.id_place_category;


--
-- TOC entry 250 (class 1259 OID 72052)
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
-- TOC entry 249 (class 1259 OID 72051)
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
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 249
-- Name: subordination_id_subordination_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.subordination_id_subordination_seq OWNED BY public.subordination.id_subordination;


--
-- TOC entry 232 (class 1259 OID 71921)
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
-- TOC entry 231 (class 1259 OID 71920)
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
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 231
-- Name: time_slot_id_time_slot_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.time_slot_id_time_slot_seq OWNED BY public.time_slot.id_time_slot;


--
-- TOC entry 216 (class 1259 OID 71806)
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
-- TOC entry 242 (class 1259 OID 71982)
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
-- TOC entry 241 (class 1259 OID 71981)
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
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 241
-- Name: user_compliance_check_id_user_compliance_check_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_compliance_check_id_user_compliance_check_seq OWNED BY public.user_compliance_check.id_user_compliance_check;


--
-- TOC entry 215 (class 1259 OID 71805)
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
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_id_user_seq OWNED BY public."user".id_user;


--
-- TOC entry 251 (class 1259 OID 72073)
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
-- TOC entry 4767 (class 2604 OID 71818)
-- Name: audit id_audit; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.audit ALTER COLUMN id_audit SET DEFAULT nextval('public.audit_id_audit_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 71832)
-- Name: company id_company; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.company ALTER COLUMN id_company SET DEFAULT nextval('public.company_id_company_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 71976)
-- Name: compliance_check id_compliance_check; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check ALTER COLUMN id_compliance_check SET DEFAULT nextval('public.compliance_check_id_compliance_check_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 72011)
-- Name: compliance_check_parameter id_parameter; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check_parameter ALTER COLUMN id_parameter SET DEFAULT nextval('public.compliance_check_parameter_id_parameter_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 71891)
-- Name: daily_timetable_sheet id_daily_timetable; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.daily_timetable_sheet ALTER COLUMN id_daily_timetable SET DEFAULT nextval('public.daily_timetable_sheet_id_daily_timetable_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 72023)
-- Name: department id_department; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department ALTER COLUMN id_department SET DEFAULT nextval('public.department_id_department_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 71957)
-- Name: document id_document; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document ALTER COLUMN id_document SET DEFAULT nextval('public.document_id_document_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 71950)
-- Name: document_category id_category; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document_category ALTER COLUMN id_category SET DEFAULT nextval('public.document_category_id_category_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 71905)
-- Name: expense_report id_expense_report; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report ALTER COLUMN id_expense_report SET DEFAULT nextval('public.expense_report_id_expense_report_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 71841)
-- Name: fee_category id_fee_category; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.fee_category ALTER COLUMN id_fee_category SET DEFAULT nextval('public.fee_category_id_fee_category_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 71863)
-- Name: mensual_timetable_sheet id_timetable; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mensual_timetable_sheet ALTER COLUMN id_timetable SET DEFAULT nextval('public.mensual_timetable_sheet_id_timetable_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 72040)
-- Name: notification id_notification; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.notification ALTER COLUMN id_notification SET DEFAULT nextval('public.notification_id_notification_seq'::regclass);


--
-- TOC entry 4775 (class 2604 OID 71943)
-- Name: permission id_permission; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permission ALTER COLUMN id_permission SET DEFAULT nextval('public.permission_id_permission_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 71848)
-- Name: place_category id_place_category; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.place_category ALTER COLUMN id_place_category SET DEFAULT nextval('public.place_category_id_place_category_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 72055)
-- Name: subordination id_subordination; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination ALTER COLUMN id_subordination SET DEFAULT nextval('public.subordination_id_subordination_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 71924)
-- Name: time_slot id_time_slot; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot ALTER COLUMN id_time_slot SET DEFAULT nextval('public.time_slot_id_time_slot_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 71809)
-- Name: user id_user; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user" ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);


--
-- TOC entry 4779 (class 2604 OID 71985)
-- Name: user_compliance_check id_user_compliance_check; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check ALTER COLUMN id_user_compliance_check SET DEFAULT nextval('public.user_compliance_check_id_user_compliance_check_seq'::regclass);


--
-- TOC entry 4788 (class 2606 OID 71822)
-- Name: audit audit_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT audit_pkey PRIMARY KEY (id_audit);


--
-- TOC entry 4790 (class 2606 OID 71836)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id_company);


--
-- TOC entry 4814 (class 2606 OID 72013)
-- Name: compliance_check_parameter compliance_check_parameter_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check_parameter
    ADD CONSTRAINT compliance_check_parameter_pkey PRIMARY KEY (id_parameter);


--
-- TOC entry 4810 (class 2606 OID 71980)
-- Name: compliance_check compliance_check_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check
    ADD CONSTRAINT compliance_check_pkey PRIMARY KEY (id_compliance_check);


--
-- TOC entry 4798 (class 2606 OID 71895)
-- Name: daily_timetable_sheet daily_timetable_sheet_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.daily_timetable_sheet
    ADD CONSTRAINT daily_timetable_sheet_pkey PRIMARY KEY (id_daily_timetable);


--
-- TOC entry 4816 (class 2606 OID 72025)
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id_department);


--
-- TOC entry 4806 (class 2606 OID 71952)
-- Name: document_category document_category_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document_category
    ADD CONSTRAINT document_category_pkey PRIMARY KEY (id_category);


--
-- TOC entry 4808 (class 2606 OID 71961)
-- Name: document document_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_pkey PRIMARY KEY (id_document);


--
-- TOC entry 4800 (class 2606 OID 71909)
-- Name: expense_report expense_report_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report
    ADD CONSTRAINT expense_report_pkey PRIMARY KEY (id_expense_report);


--
-- TOC entry 4792 (class 2606 OID 71843)
-- Name: fee_category fee_category_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.fee_category
    ADD CONSTRAINT fee_category_pkey PRIMARY KEY (id_fee_category);


--
-- TOC entry 4796 (class 2606 OID 71867)
-- Name: mensual_timetable_sheet mensual_timetable_sheet_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mensual_timetable_sheet
    ADD CONSTRAINT mensual_timetable_sheet_pkey PRIMARY KEY (id_timetable);


--
-- TOC entry 4818 (class 2606 OID 72045)
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id_notification);


--
-- TOC entry 4804 (class 2606 OID 71945)
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id_permission);


--
-- TOC entry 4794 (class 2606 OID 71850)
-- Name: place_category place_category_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.place_category
    ADD CONSTRAINT place_category_pkey PRIMARY KEY (id_place_category);


--
-- TOC entry 4820 (class 2606 OID 72057)
-- Name: subordination subordination_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_pkey PRIMARY KEY (id_subordination);


--
-- TOC entry 4802 (class 2606 OID 71928)
-- Name: time_slot time_slot_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot
    ADD CONSTRAINT time_slot_pkey PRIMARY KEY (id_time_slot);


--
-- TOC entry 4812 (class 2606 OID 71989)
-- Name: user_compliance_check user_compliance_check_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check
    ADD CONSTRAINT user_compliance_check_pkey PRIMARY KEY (id_user_compliance_check);


--
-- TOC entry 4822 (class 2606 OID 72077)
-- Name: user_permission user_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_permission
    ADD CONSTRAINT user_permission_pkey PRIMARY KEY (id_user, id_permission);


--
-- TOC entry 4786 (class 2606 OID 71813)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4823 (class 2606 OID 71823)
-- Name: audit audit_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT audit_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4834 (class 2606 OID 72014)
-- Name: compliance_check_parameter compliance_check_parameter_id_compliance_check_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.compliance_check_parameter
    ADD CONSTRAINT compliance_check_parameter_id_compliance_check_fkey FOREIGN KEY (id_compliance_check) REFERENCES public.compliance_check(id_compliance_check) ON UPDATE CASCADE;


--
-- TOC entry 4825 (class 2606 OID 71896)
-- Name: daily_timetable_sheet daily_timetable_sheet_id_timetable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.daily_timetable_sheet
    ADD CONSTRAINT daily_timetable_sheet_id_timetable_fkey FOREIGN KEY (id_timetable) REFERENCES public.mensual_timetable_sheet(id_timetable) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4835 (class 2606 OID 72031)
-- Name: department department_id_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_id_company_fkey FOREIGN KEY (id_company) REFERENCES public.company(id_company) ON UPDATE CASCADE;


--
-- TOC entry 4836 (class 2606 OID 72026)
-- Name: department department_id_sup_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_id_sup_department_fkey FOREIGN KEY (id_sup_department) REFERENCES public.department(id_department);


--
-- TOC entry 4830 (class 2606 OID 71967)
-- Name: document document_id_document_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_id_document_category_fkey FOREIGN KEY (id_document_category) REFERENCES public.document_category(id_category) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4831 (class 2606 OID 71962)
-- Name: document document_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4826 (class 2606 OID 71915)
-- Name: expense_report expense_report_id_daily_timetable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report
    ADD CONSTRAINT expense_report_id_daily_timetable_fkey FOREIGN KEY (id_daily_timetable) REFERENCES public.daily_timetable_sheet(id_daily_timetable) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4827 (class 2606 OID 71910)
-- Name: expense_report expense_report_id_fee_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.expense_report
    ADD CONSTRAINT expense_report_id_fee_category_fkey FOREIGN KEY (id_fee_category) REFERENCES public.fee_category(id_fee_category) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4824 (class 2606 OID 71868)
-- Name: mensual_timetable_sheet mensual_timetable_sheet_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mensual_timetable_sheet
    ADD CONSTRAINT mensual_timetable_sheet_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4837 (class 2606 OID 72046)
-- Name: notification notification_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4838 (class 2606 OID 72058)
-- Name: subordination subordination_id_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_id_department_fkey FOREIGN KEY (id_department) REFERENCES public.department(id_department) ON UPDATE CASCADE;


--
-- TOC entry 4839 (class 2606 OID 72063)
-- Name: subordination subordination_id_manager_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_id_manager_fkey FOREIGN KEY (id_manager) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4840 (class 2606 OID 72068)
-- Name: subordination subordination_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.subordination
    ADD CONSTRAINT subordination_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4828 (class 2606 OID 71929)
-- Name: time_slot time_slot_id_daily_time_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot
    ADD CONSTRAINT time_slot_id_daily_time_fkey FOREIGN KEY (id_daily_time) REFERENCES public.daily_timetable_sheet(id_daily_timetable) ON UPDATE CASCADE;


--
-- TOC entry 4829 (class 2606 OID 71934)
-- Name: time_slot time_slot_id_place_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.time_slot
    ADD CONSTRAINT time_slot_id_place_category_fkey FOREIGN KEY (id_place_category) REFERENCES public.place_category(id_place_category) ON UPDATE CASCADE;


--
-- TOC entry 4832 (class 2606 OID 71990)
-- Name: user_compliance_check user_compliance_check_id_compliance_check_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check
    ADD CONSTRAINT user_compliance_check_id_compliance_check_fkey FOREIGN KEY (id_compliance_check) REFERENCES public.compliance_check(id_compliance_check) ON UPDATE CASCADE;


--
-- TOC entry 4833 (class 2606 OID 71995)
-- Name: user_compliance_check user_compliance_check_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_compliance_check
    ADD CONSTRAINT user_compliance_check_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE;


--
-- TOC entry 4841 (class 2606 OID 72083)
-- Name: user_permission user_permission_id_permission_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_permission
    ADD CONSTRAINT user_permission_id_permission_fkey FOREIGN KEY (id_permission) REFERENCES public.permission(id_permission) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4842 (class 2606 OID 72078)
-- Name: user_permission user_permission_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_permission
    ADD CONSTRAINT user_permission_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-12-11 17:18:21

--
-- PostgreSQL database dump complete
--

