import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiUrl = req.url.startsWith("/api");
    if (apiUrl && ["POST", "PUT", "DELETE"].includes(req.method)) {
      return this.auth.getTokenSilently$().pipe(
        mergeMap((token) => {
          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(tokenReq);
        }),
        catchError((err) => throwError(err))
      );
    }

    return next.handle(req);
  }
}
