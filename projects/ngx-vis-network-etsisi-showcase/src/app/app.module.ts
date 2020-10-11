/*
 *   Copyright 2020 Jonathan Rodríguez Vaca
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxVisNetworkEtsisiModule } from '../../../../dist/ngx-vis-network-etsisi';
import { BasicComponent } from './basic/basic.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { StyleComponent } from './style/style.component';

@NgModule({
  declarations: [AppComponent, BasicComponent, StyleComponent, DynamicComponent],
  imports: [BrowserModule, AppRoutingModule, NgxVisNetworkEtsisiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
