
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/chat" | "/community" | "/community/chat" | "/community/[id]" | "/component-test" | "/demo" | "/found" | "/notifications" | "/reports" | "/reports/[id]" | "/search" | "/search/[id]" | "/status" | "/temuan" | "/temuan/[id]" | "/test";
		RouteParams(): {
			"/community/[id]": { id: string };
			"/reports/[id]": { id: string };
			"/search/[id]": { id: string };
			"/temuan/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/chat": Record<string, never>;
			"/community": { id?: string };
			"/community/chat": Record<string, never>;
			"/community/[id]": { id: string };
			"/component-test": Record<string, never>;
			"/demo": Record<string, never>;
			"/found": Record<string, never>;
			"/notifications": Record<string, never>;
			"/reports": { id?: string };
			"/reports/[id]": { id: string };
			"/search": { id?: string };
			"/search/[id]": { id: string };
			"/status": Record<string, never>;
			"/temuan": { id?: string };
			"/temuan/[id]": { id: string };
			"/test": Record<string, never>
		};
		Pathname(): "/" | "/chat" | "/chat/" | "/community" | "/community/" | "/community/chat" | "/community/chat/" | `/community/${string}` & {} | `/community/${string}/` & {} | "/component-test" | "/component-test/" | "/demo" | "/demo/" | "/found" | "/found/" | "/notifications" | "/notifications/" | "/reports" | "/reports/" | `/reports/${string}` & {} | `/reports/${string}/` & {} | "/search" | "/search/" | `/search/${string}` & {} | `/search/${string}/` & {} | "/status" | "/status/" | "/temuan" | "/temuan/" | `/temuan/${string}` & {} | `/temuan/${string}/` & {} | "/test" | "/test/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | string & {};
	}
}