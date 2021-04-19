export const Shaders = (color:string) => {
    const vertex = `
        const pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5));

        [[builtin(position)]] var<out> Position : vec4<f32>;
        [[builtin(vertex_idx)]] var<in> VertexIndex : i32;

        [[stage(vertex)]]
        fn main() -> void {
            Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            return;
        }
    `;

    const fragment = `
        [[location(0)]] var<out> outColor : vec4<f32>;

        [[stage(fragment)]]
        fn main() -> void {
            outColor = vec4<f32>${color};
            return;
        }
    `;
    return {vertex, fragment};
}