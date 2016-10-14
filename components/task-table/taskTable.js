angular.module('wmt-table', [])
    .controller('TableController', ['$scope', function TableController($scope) {
        var self = this;
        self.storedData = [];
        self.displayedData = [];
        self.lastGrabbedIndex = 0;

        function generateData(dim1, dim2) {
            let generatedData = [];
            function getRandomColor() {
                let letters = '0123456789ABCDEF',
                    color = '#';
                for (let i = 0; i < 6; i++ )
                    color += letters[Math.floor(Math.random() * 16)];
                return color;
            }

            function getRandomString() {
                let result = "",
                    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for(let i=0; i < 5; i++ )
                    result += letters.charAt(Math.floor(Math.random() * letters.length));
                return result;
            }

            for(let i=0; i<dim1; i++) {
                let column = [];
                for(let j=0; j<dim2; j++) {
                    column[j] = {
                        id: getRandomString(),
                        name: getRandomString(),
                        color: getRandomColor()
                    };
                }
                generatedData[i] = column;
            }
            return generatedData;
        }

        function appendData(size) {
            self.displayedData = self.displayedData.concat(self.storedData.slice(self.lastGrabbedIndex, self.lastGrabbedIndex+size));
            self.lastGrabbedIndex += size;
        }

        function applyHandlers() {
            $('.task-table-container')
                .on('scroll', function(e) {
                    if((self.displayedData.length - self.pageCapacity)*32 - e.target.scrollTop <= 32
                        && self.displayedData.length < self.storedData.length) {
                        $scope.$apply(function() {
                            appendData(10);
                        });
                    }
                });

            $('.task-table-container_data-table').on('click', 'td', function(e) {
                let $cell = $(e.target),
                    color = $cell.data('color');
                $cell.css('background-color', color);

            });
        }

        function init() {
            self.pageCapacity = Math.floor((window.innerHeight - angular.element('.task-table-container_data-table').offset().top)/32);
            self.storedData = generateData(256, 8);
            appendData(self.pageCapacity + 10);
            applyHandlers();
        }

        init();

    }]);