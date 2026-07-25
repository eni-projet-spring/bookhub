import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (requete, suivant) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return suivant(requete);
  }

  const requeteAvecToken = requete.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return suivant(requeteAvecToken);
};
