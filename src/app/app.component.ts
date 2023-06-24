import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Error:any;
  form : any;
  data : any= null;
  show = false;
  Successmesage: any;


  constructor(private http: HttpClient) {
    this.getdata();
  }
  
  ngOnInit(){
    this.form = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", Validators.required),
      position: new FormControl("", Validators.required),
      team: new FormControl("", Validators.required),
      rushingyards: new FormControl("", Validators.required),
      touchdownsthrown: new FormControl("", Validators.required),
      sacks: new FormControl("", Validators.required),
      fieldgoalsmade: new FormControl("", Validators.required),
      fieldgoalsmissed: new FormControl("", Validators.required),
      catches: new FormControl("", Validators.required),
    });
  }

  postdatadata = {
    "_id": "",
    "name": "",
    "position": "",
    "team": "",
    "stats": {
      "rushingyards": "",
      "touchdownsthrown": "",
      "sacks": "",
      "fieldgoalsmade": "",
      "fieldgoalsmissed": "",
      "catches": ""
    }
  }
  
 



  ShowModal(){
    this.show = true;
    this.Error="";
    this.form.setValue({
      _id: null,
      name: "",
      position: "",
      team: "",
      rushingyards: "",
      touchdownsthrown: "",
      sacks: "",
      fieldgoalsmade: "",
      fieldgoalsmissed:"",
      catches: ""
    })
  }
  CloseModal(){
    this.show= false;
  }

  onclicksubmit(result :any){
    console.log(result.value);
    if(result.valid){
      this.postdatadata._id= result.value._id;
      this.postdatadata.name = result.value.name;
      this.postdatadata.position = result.value.position;
      this.postdatadata.team = result.value.team;
      this.postdatadata.stats.rushingyards = result.value.rushingyards;
      this.postdatadata.stats.touchdownsthrown = result.value.touchdownsthrown;
      this.postdatadata.stats.sacks = result.value.sacks;
      this.postdatadata.stats.fieldgoalsmade = result.value.fieldgoalsmade;
      this.postdatadata.stats.fieldgoalsmissed = result.value.fieldgoalsmissed;
      this.postdatadata.stats.catches = result.value.catches;

      if(result.value._id === null){
        this.http.post("http://127.0.0.1:8080/api/Football", this.postdatadata).subscribe((res)=>{
          this.show = false;
          this.Successmesage = ""+ result.value.name+" Added Successfully";
        })
      }
      else{
        this.http.patch("http://127.0.0.1:8080/api/UpdatePlayer/"+result.value._id+"", this.postdatadata).subscribe((res)=>{
        this.show = false;
        this.Successmesage = ""+ result.value.name+" updated successfully";
      })
      }
    this.getdata();
      
    }
    else{
      this.Error="Please fill all the important fields"

    }

  }



  Edit(player: any, id: number) {
    this.form.setValue({
      _id: player._id,
      name: player.name,
      position: player.position,
      team: player.team,
      rushingyards: player.stats.rushingyards,
      touchdownsthrown: player.stats.touchdownsthrown,
      sacks: player.stats.sacks,
      fieldgoalsmade: player.stats.fieldgoalsmade,
      fieldgoalsmissed: player.stats.fieldgoalsmissed,
      catches: player.stats.catches
    })
    this.show = true;
  }


  getdata() {
    this.http.get("http://127.0.0.1:8080/api/Football").subscribe((data) => {
    this.data = data;
      console.log(data);
    })
  }

  delData(id : any){
    this.http.delete("http://127.0.0.1:8080/api/DeletePlayer/"+ id+"").subscribe(()=>{
      this.Successmesage= "Player deleted successfully";
      
      this.getdata();
    })
  }

  getplayerwithMostTouchdown(){
    this.http.get("http://127.0.0.1:8080/api/GetplayerwithMostTouchdownpasses").subscribe((data) => {
    this.data = data;
      console.log(data);
    })
  }
  
  getPlayerwithMostRushingyards(){
    this.http.get("http://127.0.0.1:8080/api/GetplayerwithMostrushingyards").subscribe((data) => {
      this.data = data;
        console.log(data);
      })
  }
  
  getPlayerwithleastRushingyards(){
    this.http.get("http://127.0.0.1:8080/api/GetplayerwithLeastrushingyards").subscribe((data) => {
      this.data = data;
        console.log(data);
      })
  }

    
  getPlayerwithMostSacks(){
    this.http.get("http://127.0.0.1:8080/api/GetplayerwithMostSacks").subscribe((data) => {
      this.data = data;
        console.log(data);
      })
  }

  getPlayerwithGoalsDesc(){
    this.http.get("http://127.0.0.1:8080/api/GetplayerslistwithGoalsdesc").subscribe((data) => {
      this.data = data;
        console.log(data);
      })
  }
}
