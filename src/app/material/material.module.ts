import { NgModule } from '@angular/core';
import { MatInputModule, MatIconModule, MatBadgeModule, MatToolbarModule, MatMenuModule, MatCardModule, MatButtonModule } from '@angular/material';

const MaterialComponents = [
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatBadgeModule,
  MatIconModule,
  MatInputModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
