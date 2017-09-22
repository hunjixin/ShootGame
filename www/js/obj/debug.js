define(['util', 'EObject', 'resource',], function (util, EObject, resource) {

    return function(){
        this.isDebug= {
            message: '显示调试信息',
            value: true
          }
          this.stageTime= {
            message: '关卡时长',
            value: 20 // unit ms
          }
          this.spoilRate= {
            message: '战利品几率',
            value: 0.5
          }
          this.enemyRemoveRate= {
            message: '敌军移动速率',
            value: 0.5
          }
          this.enemyShotRate= {
            message: '敌军射速',
            value: 0.5
          }
          this.playerShotRate= {
            message: '玩家射速度',
            value: 20
          }
          this.spoilRate= {
            message: '战利品几率',
            value: 0.5
          }
    }
})