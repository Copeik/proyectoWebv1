import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = '';
  password = '';
  msgs=[];

  constructor(private authService: AuthenticationService,private router:Router) {

  }
  Login() {
    //logueamos
    this.authService.login(this.user, this.password).subscribe(res => {
      console.log(res);
    },error => {
      if (error.status==200) {
        console.log(error);
        let jwt = error.error.text;
      console.log(jwt);
        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)


        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
        console.log('decodedJwtData: ' + decodedJwtData.sub)
        //aqui le mandamos el token y el usuario para que lo guarde
        this.authService.saveuser(decodedJwtData.sub);
        this.router.navigate(['inicio']);
        setTimeout(() => {
          window.location.reload();
        }, 0);
        

        
      }
      else{console.log(error);
        this.msgs.push({severity:'error', summary:'Error', detail:'Error en la autentificacion'});
       }
      
        
    });
    
  }

  ngOnInit() { }
}