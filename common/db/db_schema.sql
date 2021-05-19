CREATE SCHEMA public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--
-- TOC entry
-- Name: users; Type: TABLE; Schema: public; Owner: pxrclgjmygprty
--
create table public.users (
   user_id UUID default uuid_generate_v4() not null,
   email character varying(150) not null,
   passowrd character varying(100) not null,
   primary key(user_id, email)
);

--
-- TOC entry
-- Name: employees; Type: TABLE; Schema: public; Owner: pxrclgjmygprty
--
create table public.employees (
   employee_id serial not null,
	first_name character varying(100) not null,
   last_name character varying(100) not null,
   organization_name character varying(150) not null,
   user_id uuid
	primary key(employee_id)
);


