'use strict';

(function () {
    describe('DirectionsService', function () {
        //Initialize global variables
        var Service;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));



        beforeEach(inject(function (_DirectionsService_) {
            Service = _DirectionsService_;
        }));


        it('should not duplicate skills', function () {
            //Service.rewards = testRewards.slice(0);
            //
            //Service.inventory = [{rewardId: '101', amount: 1},
            //    {rewardId: '1', amount: 1},
            //    {rewardId: '3', amount: 1}];
            //
            //Service.addRewardToInventory('101');
            //expect(Service.inventory.length).toBe(3);
            //expect(Service.inventory).toContain({rewardId: '101', amount: 1});

            expect(1).toBe(2);
        });



    });
})();
