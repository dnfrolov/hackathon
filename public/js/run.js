'use strict';

function run($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name === 'user.profile' && !toParams.id && fromParams.id) {
            event.preventDefault();
            $state.go('user.profile', {id: fromParams.id});
        }

        if (toState.name === 'performance' && !toParams.id && fromParams.id) {
            event.preventDefault();
            $state.go('performance', {id: fromParams.id});
        }
    });
}

module.exports = run;