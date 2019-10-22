import { NgModule } from '@angular/core';
import { MatDialogModule, MatDividerModule, MatButtonToggleModule, MatRadioModule, MatInputModule, MatIconModule, MatBadgeModule, MatToolbarModule, MatMenuModule, MatCardModule, MatButtonModule } from '@angular/material';

const MaterialComponents = [
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatBadgeModule,
  MatIconModule,
  MatInputModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatDividerModule,
  MatDialogModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
