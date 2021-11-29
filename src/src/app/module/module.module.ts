import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StaffComponent } from './staff/staff.component'

@NgModule({
  declarations: [StaffComponent],
  imports: [CommonModule],
  exports: [StaffComponent],
})
export class ModuleModule {}
