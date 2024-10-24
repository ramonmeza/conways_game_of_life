#version 330 core

// pass these in as uniforms/in?
const int TEXTURE_WIDTH = 512;
const int TEXTURE_HEIGHT = 512;

uniform sampler2D previousStateTexture;
uniform float deltaTime;

in vec2 TexCoords;

out vec4 FragColor;

void main()
{
	vec4 prevState = texture(previousStateTexture, TexCoords);

	float texelWidth = 1.0 / TEXTURE_WIDTH;
	float texelHeight = 1.0 / TEXTURE_HEIGHT;

	vec4 currentColor = texture(previousStateTexture, TexCoords);

	vec4 leftColor = texture(previousStateTexture, TexCoords - vec2(texelWidth, 0.0));
	vec4 rightColor = texture(previousStateTexture, TexCoords + vec2(texelWidth, 0.0));
	vec4 topColor = texture(previousStateTexture, TexCoords + vec2(0.0, texelHeight));
	vec4 bottomColor = texture(previousStateTexture, TexCoords - vec2(0.0, texelHeight));

	// count neighbours
	int neighbours = 0;
	if (leftColor.x > 0.0)   { neighbours++; }
	if (rightColor.x > 0.0)  { neighbours++; }
	if (topColor.x > 0.0)    { neighbours++; }
	if (bottomColor.x > 0.0) { neighbours++; }

	// live cells are black, dead are white
	// Any live cell with...
	if (currentColor.x == 0.0) {
		// fewer than two live neighbours dies, as if by underpopulation.
		if (neighbours < 2) {
			FragColor = vec4(1.0, 1.0, 1.0, 1.0);
		}
		
		// two or three live neighbours lives on to the next generation.
		else if (neighbours == 2 || neighbours == 3) {
			FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		}

		// more than three live neighbours dies, as if by overpopulation.
		else if (neighbours > 3) {
			FragColor = vec4(1.0, 1.0, 1.0, 1.0);
		}
	}

	// Any dead cell with...
	else {
		// exactly three live neighbours becomes a live cell, as if by reproduction.
		if (neighbours == 3) {
			FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		} else {
			// still dead
			FragColor = vec4(1.0, 1.0, 1.0, 1.0);
		}
	}
}
