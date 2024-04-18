import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './components';
import { AuthGuardService } from './services';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './layouts';

import { CrmContactListComponent } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactDetailsComponent } from './pages/crm-contact-details/crm-contact-details.component';
import { PlanningTaskListComponent } from './pages/planning-task-list/planning-task-list.component';
import { PlanningTaskDetailsComponent } from './pages/planning-task-details/planning-task-details.component';
import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component';
import { AnalyticsSalesReportComponent } from './pages/analytics-sales-report/analytics-sales-report.component';
import { AnalyticsGeographyComponent } from './pages/analytics-geography/analytics-geography.component';
import { PlanningSchedulerComponent } from './pages/planning-scheduler/planning-scheduler.component';
import { AppSignInComponent } from './pages/sign-in-form/sign-in-form.component';
import { AppSignUpComponent } from './pages/sign-up-form/sign-up-form.component';
import { AppResetPasswordComponent } from './pages/reset-password-form/reset-password-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { DespejeLineaComponent } from './pages/despeje-linea/despeje-linea.component';
import { ImpresionRotuloComponent } from './pages/impresion-rotulo/impresion-rotulo.component';
import { BatchRecordEtapasComponent } from './pages/batch-record-etapas/batch-record-etapas.component';
import { InspeccionProductoTerminadoComponent } from './pages/inspeccion-producto-terminado/inspeccion-producto-terminado.component';
import { OperacionProcesoPageComponent } from './pages/operacion-proceso-page/operacion-proceso-page.component';
import { AsignacionRecursosPageComponent } from './pages/asignacion-recursos-page/asignacion-recursos-page.component';
import { CertificadoCalidadPageComponent } from './pages/certificado-calidad-page/certificado-calidad-page.component';
import { DespejeLineaFinalComponent } from './pages/despeje-linea-final/despeje-linea-final.component';
import { ControlesEnProcesoComponent } from './pages/controles-en-proceso/controles-en-proceso.component';
import { ControlesEnProcesoAcondicionamientoComponent } from './pages/controles-en-proceso-acondicionamiento/controles-en-proceso-acondicionamiento.component';
import { OperacionProcesoComponent } from './components/activesoft/operacion-proceso/operacion-proceso.component';
import { DefinicionDespejeLineaComponent } from './pages/definicion-despeje-linea/definicion-despeje-linea.component';
import { OrdenProduccionComponent } from './pages/orden-produccion/orden-produccion.component';
import { InstructivoFabricacionComponent } from './pages/instructivo-fabricacion/instructivo-fabricacion.component';


const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: SideNavOuterToolbarComponent,
    children: [
      {
        path: 'orden',
        component: OrdenProduccionComponent
      },
      {
        path: 'order-list',
        component: OrderListComponent
      },
      {
        path: 'ruta-prod',
        component: OperacionProcesoPageComponent
      },
      {
        path: 'portada',
        component: BatchRecordEtapasComponent
      },
      {
        path: 'despeje-linea',
        component: DespejeLineaComponent
      },
      {
        path: 'despeje-final',
        component: DespejeLineaFinalComponent
      },
      {
        path: 'impresion-rotulo',
        component: ImpresionRotuloComponent
      },
      {
        path: 'batch-record-etapas-list',
        component: BatchRecordEtapasComponent
      },
      {
        path: 'inspeccion-producto-terminado',
        component: InspeccionProductoTerminadoComponent
      },
      {
        path: 'operacion-proceso-page',
        component: OperacionProcesoPageComponent
      },
      {
        path: 'asignacion-recursos-page',
        component: AsignacionRecursosPageComponent
      },
      {
        path: 'certificado-calidad-page',
        component: CertificadoCalidadPageComponent
      },
      {
        path: 'controles-en-proceso',
        component: ControlesEnProcesoComponent
      },
      {
        path: 'controles-en-procso-acondicionamiento',
        component: ControlesEnProcesoAcondicionamientoComponent
      },
      {
        path: 'definicion-despeje-linea',
        component: DefinicionDespejeLineaComponent
      },
      {
        path: 'instructivo-fab',
        component: InstructivoFabricacionComponent
      },
      {
        path: 'crm-contact-list',
        component: CrmContactListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'crm-contact-details',
        component: CrmContactDetailsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'planning-task-list',
        component: PlanningTaskListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'planning-task-details',
        component: PlanningTaskDetailsComponent
      },
      {
        path: 'planning-scheduler',
        component: PlanningSchedulerComponent
      },
      {
        path: 'analytics-dashboard',
        component: AnalyticsDashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'analytics-sales-report',
        component: AnalyticsSalesReportComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'analytics-geography',
        component: AnalyticsGeographyComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-in-form',
        component: AppSignInComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-up-form',
        component: AppSignUpComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'reset-password-form',
        component: AppResetPasswordComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, }),
    BrowserModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
