import { NgModule } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {StyleClassModule} from "primeng/styleclass";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BtnLoadingDirective} from "../directives/btn-loading.directive";
import {TagModule} from "primeng/tag";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { DataViewModule } from 'primeng/dataview';
import {PasswordModule} from "primeng/password";
import {AutoFocusModule} from "primeng/autofocus";
import {MessagesModule} from "primeng/messages";
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import {TableModule} from "primeng/table";
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {FileUploadModule} from "primeng/fileupload";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmPopupModule} from "primeng/confirmpopup";


@NgModule({
  providers: [
    MessageService,
    ConfirmationService
  ],
  declarations: [
    BtnLoadingDirective
  ],
  exports: [
    StyleClassModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    BtnLoadingDirective,
    TagModule,
    ToastModule,
    DataViewModule,
    RatingModule,
    PasswordModule,
    AutoFocusModule,
    MessagesModule,
    ProgressSpinnerModule,
    FieldsetModule,
    TableModule,
    DividerModule,
    ImageModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule,
    MultiSelectModule,
    ConfirmPopupModule
  ]
})
export class PrimeNgModule { }
