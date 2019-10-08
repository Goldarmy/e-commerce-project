import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule } from '@angular/material';

const MaterialComponents = [
  MatCardModule,
  MatButtonModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
