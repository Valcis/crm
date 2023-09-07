import { Validators, Editor, Toolbar } from "ngx-editor";
import {FormControl, FormGroup,AbstractControl} from "@angular/forms";
import {Component, Input, OnDestroy, OnInit,EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @Input() htmlContent: string= "";
  @Output() htmlContentChange= new EventEmitter<any>();

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  protected  form = new FormGroup({
    editorContent: new FormControl(this.htmlContent,Validators.required())
  });

  get doc(): AbstractControl {
    return <AbstractControl<any, any>>this.form.get("editorContent");
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(){
    this.editor = new Editor();
    this.form.get("editorContent")?.valueChanges.subscribe(x => {
      this.htmlContentChange.emit(this.form.get("editorContent")?.value);
    })
  }

}
