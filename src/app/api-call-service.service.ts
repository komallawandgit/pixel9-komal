import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiCallServiceService {
  url1=" http://lab.thinkoverit.com/api/getOTP.php";
  url2=" http://lab.thinkoverit.com/api/verifyOTP.php";

  constructor(private http:HttpClient) { }
  public getOtp(obj):Observable<any>{
    return this.http.post(this.url1,obj,{}).pipe(map(res=>res));

  }

  public verifyOtp(body):Observable<any>{
    return this.http.post(this.url2,body,{}).pipe(map(res=>res));

  }
 
}
