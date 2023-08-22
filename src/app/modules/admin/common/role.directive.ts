import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appRole]' })
export class AppRoleDirective {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    @Input() set appRole(name) {
        let roles = JSON.parse(localStorage.getItem('user'))['user_role_m'];
        let roleFound = false;
        if (roles.length) {
            roles.forEach((k) => {
                if (k['role_name'] === name) {
                    roleFound = true;
                }
            });
        }
        if (roleFound) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!roleFound) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
