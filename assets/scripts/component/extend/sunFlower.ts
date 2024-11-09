import { _decorator, animation, Component, Node } from 'cc';
import { Plant } from '../../manage/Plant';
import { PlantStatus } from '../../glob/StatusEnum';
const { ccclass, property } = _decorator;

@ccclass('sunFlower')
export class sunFlower extends Plant {

    @property({ type: Number, tooltip: '生成太阳的间隔' })
    needTimeCount: number = 3;

    doTime: number = 0;

    anim: animation.AnimationController;


    protected onLoad(): void {
        super.onLoad();
        this.anim = this.node.getComponent(animation.AnimationController);
    }

    update(deltaTime: number): void {
        // super.update(deltaTime);

        switch (this.plantStatus) {
            case PlantStatus.disable:
                this.disableUpdate();
                break;
            case PlantStatus.enable:
                this.enableUpdate();
                break;
        }
        this.doTime += deltaTime;
        if (this.doTime >= this.needTimeCount) {
            this.doTime = 0;
            this.anim.setValue('isGrouing', true);
        }
    }

    enableUpdate(): void {
        super.enableUpdate();
        // console.log('调用启用更新方法 enableUpdate');
        this.plantStatus = PlantStatus.enable;
        this.node.getComponent(animation.AnimationController).enabled = true;
    }
    disableUpdate(): void {
        super.disableUpdate();
        // console.log('调用禁用更新方法 disableUpdate');
        this.plantStatus = PlantStatus.disable;
        this.node.getComponent(animation.AnimationController).enabled = false;
    }

    boom(num: number) {
        console.log('生成植物', num);
    }
}


