        var Links = {
            SetColor: function (color){
                var alist = document.querySelectorAll('a');
                var i = 0;
                while(i < alist.length){
                    alist[i].style.color = color;
                    i=i+1;
                }
            }
        }    
        var Body = {
            SetColor: function (color){
            document.querySelector('body').style.color = color;
            }, 
            SetBackgroundColor: function(color){
            document.querySelector('body').style.backgroundColor = color;
            }
        }

        function NightDayHandler(self){
        var target = document.querySelector('body');
        if (self.value === 'night'){
            Links.SetColor('white');
            Body.SetBackgroundColor('black');
            Body.SetColor('white');
            self.value = 'day';
        }
        else{
            Links.SetColor('blue');
            Body.SetBackgroundColor('white');
            Body.SetColor('black');
            self.value = 'night';
            }
        }
