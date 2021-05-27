import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { WeatherAddComponent } from '../weather-add/weather-add.component';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less'],
})
export class WeatherComponent implements OnInit {
  @ViewChild('templateadd', { read: ViewContainerRef }) place: ViewContainerRef;
  constructor(
    private weathServ: WeatherService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.weathServ.onAddedCity.subscribe((result) => {
      if (result) {
        const factory =
          this.resolver.resolveComponentFactory(WeatherAddComponent);
        const componentRef = this.place.createComponent(factory);
      }
    });
  }
}
