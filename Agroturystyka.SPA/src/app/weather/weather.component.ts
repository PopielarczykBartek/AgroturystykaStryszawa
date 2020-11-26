import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
    this.getValues();
  }



  getValues(): any{
    this.http.get('http://localhost:5000/api/WeatherForecast').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }
}
