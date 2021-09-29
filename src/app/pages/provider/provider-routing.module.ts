import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramProviderComponent } from './program-provider/program-provider.component';
import { ProviderComponent } from './provider.component';
const routes: Routes = [
  {path: '', component: ProviderComponent, children:[

    {
        path: 'program-provider/:name/:id', component: ProgramProviderComponent
    },
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
