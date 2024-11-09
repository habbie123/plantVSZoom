import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;


/**
 * 全局游戏控制变量
 */
@ccclass('ControlSun')
export class ControlSun extends Component {

    
    @property(Number)
    private SUN_COUNT:number = 100;
    @property(Label)
    private sunCountLabel:Label = null;//太阳总数文本对象

    private static _instance:ControlSun = null;
    public static get Instance():ControlSun{
        return this._instance;
        // if(this._instance == null){
        //     this._instance = new ControlSun();
        // }
        // console.log('label null=', this._instance.sunCountLabel == null);
        // return this._instance;
    }

    /**
     * 获取太阳数量
     * */
    public takeSunCount():number{
        return this.SUN_COUNT;
    }

    /**
     * 更新太阳总数
     * @param num 太阳数量
     */
    updateSunCount(num:number):void{
        this.SUN_COUNT += num;
        this.updateSunCountLabel();
    }

    protected onLoad(): void {
        if(ControlSun._instance == null){
            ControlSun._instance = this;
        }else{
            console.log('cant find ControlSun instance');
            this.node.destroy();
            return;
        }
    }

    protected start(): void {
        this.updateSunCountLabel();
        // ControlSun._instance = this;
    }

    updateSunCountLabel():void{
        console.log('sun label', this.sunCountLabel);
        this.sunCountLabel.string = this.SUN_COUNT.toString();
    }


}


