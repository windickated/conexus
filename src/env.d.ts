/// <reference types="astro/client" />

type Nullable<T> = T | null | undefined;

type VolumeControl = {
    muted: boolean;
    volume: number;
    restart: boolean;
}

interface SignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: Roles;
}

interface User extends SignUp {
    ID?: string;
    oauth_id?: string;
    email_confirmed?: boolean;
    referral_count?: number;
}

interface SignIn {
    email: string;
    password: string;
}

enum Roles {
    ADMIN = "admin",
    USER = "user",
    ARTIST = "artist",
}

interface ReferralCode {
	ID: number;
	code: string;
	user_id: number;
	is_used: boolean;
	used_by: number;
	created_at: string;
	updated_at: string;
}

interface ReferralSignUp {
	user: User;
	referral_code: string;
}