import $ from 'jquery';
import { CheckWebGPU } from './helper';
import { Shaders } from './shaders';

const CreateTriangle = async (color='(1.0,1.0,1.0,1.0)') => {
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes('Your current browser does not support WebGPU!')){
        console.log(checkgpu);
        throw('Your current browser does not support WebGPU!');
    }

    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;        
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;       
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('gpupresent') as unknown as GPUCanvasContext;
    const swapChainFormat = 'bgra8unorm';
    const swapChain = context.configureSwapChain({
        device: device,
        format: swapChainFormat,
    });
    
    const shader = Shaders(color);
    const pipeline = device.createRenderPipeline({
        vertexStage: {
            module: device.createShaderModule({                    
                code: shader.vertex
            }),
            entryPoint: "main"
        },
        fragmentStage: {
            module: device.createShaderModule({                    
                code: shader.fragment
            }),
            entryPoint: "main"
        },
        primitiveTopology: "triangle-list",
        colorStates: [{
            format: swapChainFormat
        }]
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = swapChain.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            attachment: textureView,
            loadValue: [0.5, 0.5, 0.8, 1] //background color
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.draw(3, 1, 0, 0);
    renderPass.endPass();

    device.queue.submit([commandEncoder.finish()]);
}

CreateTriangle();
$('#id-btn').on('click', ()=>{
    const color = $('#id-color').val() as string;
    CreateTriangle(color);
});



