import { NgModule } from '@angular/core';
import { MatTabsModule, MatSnackBarModule, MatListModule, MatSelectModule, MatDialogModule, MatDividerModule, MatButtonToggleModule, MatRadioModule, MatInputModule, MatIconModule, MatBadgeModule, MatToolbarModule, MatMenuModule, MatCardModule, MatButtonModule } from '@angular/material';

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
  MatDialogModule,
  MatSelectModule,
  MatListModule,
  MatSnackBarModule,
  MatTabsModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
