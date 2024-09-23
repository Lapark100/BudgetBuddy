import { updateSession } from './lib/supabase/middleware';
import { createClient } from './lib/supabase/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // First, update the session to ensure it's current
  const supabaseResponse = await updateSession(request);

  // Then, get the user after updating the session
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();


  // Redirect unauthenticated users trying to access protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users trying to access public routes
  if (user && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Return the response with the updated session
  return supabaseResponse;
}

// Config for matching paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
