angular.module('wmt-table', [])
    .controller('TableController', function TableController() {
        var self = this;
        self.data = [];

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

        function init() {
            self.data = generateData(8, 256);
        }

        init();

    });