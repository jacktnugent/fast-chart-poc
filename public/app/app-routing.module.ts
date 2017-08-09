import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/charts',
                pathMatch: 'full'
            },
            {
                path: 'charts',
                component: PanelComponent,
            }
        ], { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }