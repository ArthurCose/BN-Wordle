export const GAME_WIDTH = 240;
export const GAME_HEIGHT = 160;

export const BLOCK_RENDER_SIDE_LEN = 20;

export const GRID_BLOCK_SIDE_LEN = 5;
export const GRID_BLOCK_CENTER = Math.floor(GRID_BLOCK_SIDE_LEN / 2);
export const GRID_RENDER_SIDE_LEN = GRID_BLOCK_SIDE_LEN * BLOCK_RENDER_SIDE_LEN;
export const GRID_RENDER_OFFSET_X = BLOCK_RENDER_SIDE_LEN;
export const GRID_RENDER_OFFSET_Y = BLOCK_RENDER_SIDE_LEN * 1.5;

export const INVENTORY_OFFSET_X =
  GRID_RENDER_OFFSET_X + GRID_RENDER_SIDE_LEN + BLOCK_RENDER_SIDE_LEN;
export const INVENTORY_OFFSET_Y = GRID_RENDER_OFFSET_Y;

export const BORDER_COLOR = "#889EB3";
export const GRID_BACKGROUND_COLOR = "#124D7F";
