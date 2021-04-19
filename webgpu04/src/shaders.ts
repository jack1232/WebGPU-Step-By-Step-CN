export const GlslShaders = () => {
    const vertex = `
        #version 450
        const vec2 pos[3] = vec2[3](
            vec2( 0.0f,  0.5f), 
            vec2(-0.5f, -0.5f), 
            vec2( 0.5f, -0.5f)
        );

        const vec3 color[3] = vec3[3](
            vec3(1.0f, 0.0f, 0.0f),
            vec3(0.0f, 1.0f, 0.0f),
            vec3(0.0f, 0.0f, 1.0f)
        );

        layout(location=0) out vec4 vColor;

        void main() {
            vColor = vec4(color[gl_VertexIndex], 1.0f);
            gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);
        }
    `;

    const fragment = `
        #version 450    
        layout(location=0) in vec4 vColor;
        layout(location=0) out vec4 fragColor;

        void main() {
            fragColor = vColor;
        }
    `;
return {vertex, fragment};
}

export const Shaders = () => {
    const vertex = `
        const pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5)
        );

        const color : array<vec3<f32>, 3> = array<vec3<f32>, 3>(
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0)
        );

        [[builtin(position)]] var<out> Position : vec4<f32>;
        [[builtin(vertex_idx)]] var<in> VertexIndex : i32;
        [[location(0)]] var<out> vColor : vec4<f32>;

        [[stage(vertex)]]
        fn main() -> void {
            Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            vColor = vec4<f32>(color[VertexIndex], 1.0);
            return;
        }
    `;

    const fragment = `
        [[location(0)]] var<in> vColor : vec4<f32>;
        [[location(0)]] var<out> fragColor : vec4<f32>;

        [[stage(fragment)]]
        fn main() -> void {
            fragColor = vColor;
            return;
        }
    `;
    return {vertex, fragment};
}
