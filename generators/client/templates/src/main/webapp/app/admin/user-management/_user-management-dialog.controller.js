(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('UserManagementDialogController',UserManagementDialogController);

    UserManagementDialogController.$inject = ['$stateParams', '$mdDialog', 'entity', 'User'<% if (enableTranslation) { %>, '<%=jhiPrefixCapitalized%>LanguageService'<% } %>];

    function UserManagementDialogController ($stateParams, $mdDialog, entity, User<% if (enableTranslation) { %>, <%=jhiPrefixCapitalized%>LanguageService<% } %>) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        vm.clear = clear;
        vm.languages = null;
        vm.save = save;
        vm.user = entity;


        <%_ if (enableTranslation) { _%>
        <%=jhiPrefixCapitalized%>LanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });
        <%_ } _%>

        function clear () {
            $mdDialog.cancel();
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            $mdDialog.hide();
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        function save () {
            vm.isSaving = true;
            if (vm.user.id !== null) {
                User.update(vm.user, onSaveSuccess, onSaveError);
            } else {<% if (!enableTranslation){ %>
                vm.user.langKey = 'en';<% } %>
                User.save(vm.user, onSaveSuccess, onSaveError);
            }
        }
    }
})();
