let Tech = function(power){
    let status = false;
    
    power = power || 0;
    //Включаем устройство в сеть
    this.enable = function(){
        status = true
    };

    //Выключаем устройство
    this.disable = function(){
        status = false;
    }
    //Возврощает значение переменной status
    this.getStatus = function(){
        return status;
    };
    //Возврощает значение переменной power
    this.getPower = function(){
        return power;
    };

};

let Teapot = function(){
    Tech.apply(this, arguments);

    this.create = function(){
        let htmlTeapot =`   <div class="teapot"></div>
                            <div class="info">
                                <p>Mощьность электрочайника (кВт)</p>
                                <input type="text" id="info__power">

                                <p>Oбъем электрочайника (л)</p>
                                <input type="text" id="info__size"><br>
                                <button id="btn">Налить воду в чайник</button>

                            </div>`;


        let element = document.querySelector('.wrapper')
        element.innerHTML = htmlTeapot

        let power = document.querySelector('#info__power');            
        power.addEventListener('keyup', (event)=>{
            if(event.keyCode == '13'){                
                this.power1=(event.target.value)
                console.log(this.power1)                      
            }       
        }); 

        let size = document.querySelector('#info__size');            
        size.addEventListener('keyup', (event)=>{
            if(event.keyCode == '13'){                
                this.size1=(event.target.value) 
                console.log(this.size1)                    
            }       
        }); 

        let btn = document.querySelector('#btn')
        btn.addEventListener('click', ()=>{                              
            this.setWater()                               
        }); 
       
    };
          
    let waterAmount = 0,
        status= false,
        self=this,
        sT =null;
    

    //Сохраняем функционал родительского метода
    let parentGetStatus=this.getStatus,
        parentDisable = this.disable;
    

    //Наливаем необходимое количество воды 
    this.setWater = function(){
        let teapotImg = document.querySelector('.teapot');
        teapotImg.classList.remove('teapot')
        teapotImg.classList.add('teapot1')

        let htmlTeapot2 =` <p>Какое количество воды необходимо налить(л)</p>
                            <input type="text" id="info__volume">

                            <p>Начальная температура воды (°С)</p>
                            <input type="text" id="info__temperature"><br>
                            <button id="btn">Рассчитать время закипания воды</button>`;
     
        let element2 = document.querySelector('.info')
        element2.innerHTML = htmlTeapot2

        let volume = document.querySelector('#info__volume');            
        volume.addEventListener('keyup', (event)=>{
            if(event.keyCode == '13'){                
               this.volume1=(event.target.value) 

               console.log(this.volume1)                  
            }  
        });

       
        
        let temperature = document.querySelector('#info__temperature');            
        temperature.addEventListener('keyup', (event)=>{
            if(event.keyCode == '13'){                
                this.temperature1=(event.target.value) 
                console.log(this.temperature1)                  
            }  
        });

        let btn = document.querySelector('#btn')
        btn.addEventListener('click', ()=>{ 
            
            if(this.volume1>0  && this.volume1<= this.size1){
                waterAmount=this.volume1
                this.calculation();
            }else{
                woterAmount = 0
                if(this.volume1 > this.size1)alert(`Вы хотите налить количество воды не соответствующее объему чайника. Oбъем чайника ${this.size1} л`);
                this.off()
            }
                                           
        });        
        
    };
    //Получаем информацию о том сколько воды налито
    this.getWater = function(){
        console.log(waterAmount)
        return waterAmount;
    };
    //Расчет времени закипания
    this.calculation = function(){

        let teapotImg2 = document.querySelector('.teapot1');
        teapotImg2.classList.remove('teapot1')
        teapotImg2.classList.add('teapot2')

        let a=this.volume1,
            b=this.temperature1,
            c=this.power1;
        this.result= Math.round((0.00117*a*(100 - b)/c)*60);
        console.log(this.result) 
        
        let htmlTeapot3=`<p>Для закипания воды необходимо ${this.result} минут</p><br>
                        <button id="btn">Включить чайник</button>`;
     
        
        let element3 = document.querySelector('.info')
        element3.innerHTML = htmlTeapot3
        
        let btn = document.querySelector('#btn')
        btn.addEventListener('click', ()=>{                              
            this.on();                               
        });                                               
    };

    //Кнопка включения
    this.on = function(){
        if(parentGetStatus()==true && waterAmount>0);
        status = true;
        boiling();
    };

    //Кнопка выключения чайника
    this.off = function(){
        status = false;
        clearTimeout(sT);

        let htmlTeapot2=`<div class="teapotOffImg"></div>
                         <div class="teapotOff">
                            <h2>Чайник выключен</h2>
                         </div>`

        let elementOff = document.querySelector('.wrapper');
        elementOff.innerHTML=htmlTeapot2
        
        elementOff.classList.add('decoration')
       

    };

    //Закипание воды 
    let boiling = function(){
        let teapotImg3 = document.querySelector('.teapot2');
        teapotImg3.classList.remove('teapot2')
        teapotImg3.classList.add('teapot3')

        document.querySelector('.info').innerHTML=''
        sT = setTimeout(()=>{
            alert('Вода закипела');
            self.off()
        }, 5000);
    }

    //Переопределяем метод getStatus объекта Tech
    this.getStatus = function(){
        parentGetStatus.call(this);

        if(status==true && parentGetStatus()==true)return true;

        return false;
    };

     //Переопределяем метод disable объекта  Tech
    this.disable = function(){
        parentDisable.call(this);
        parentDisable();

        if(parentGetStatus()==false)this.off();
    };
}


window.addEventListener('load', ()=>{
    let teapot = new Teapot()
    teapot.create()
})