import { Component } from '@angular/core';
import { HostBinding } from '@angular/core';
import { routerAnimationState } from '../../animations/animations';
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
  animations : [routerAnimationState]
})
export class ResourcesComponent {
  @HostBinding("@routeAnimationTrigger") routeAnimation = true
}
