(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Game dimensions - larger canvas, smaller entities for strategic play
__turbopack_context__.s([
    "DARK_BG",
    ()=>DARK_BG,
    "GAME_HEIGHT",
    ()=>GAME_HEIGHT,
    "GAME_WIDTH",
    ()=>GAME_WIDTH,
    "GRAVITY",
    ()=>GRAVITY,
    "JUMP_FORCE",
    ()=>JUMP_FORCE,
    "LEVELS",
    ()=>LEVELS,
    "MOVE_SPEED",
    ()=>MOVE_SPEED,
    "NEON_BLUE",
    ()=>NEON_BLUE,
    "NEON_GREEN",
    ()=>NEON_GREEN,
    "NEON_PURPLE",
    ()=>NEON_PURPLE,
    "PLATFORM_BORDER",
    ()=>PLATFORM_BORDER,
    "PLATFORM_COLOR",
    ()=>PLATFORM_COLOR,
    "PLAYER_SIZE",
    ()=>PLAYER_SIZE,
    "TELEPORT_COOLDOWN_FRAMES",
    ()=>TELEPORT_COOLDOWN_FRAMES,
    "TELEPORT_DISTANCE",
    ()=>TELEPORT_DISTANCE,
    "TELEPORT_WINDUP_FRAMES",
    ()=>TELEPORT_WINDUP_FRAMES,
    "TILE_SIZE",
    ()=>TILE_SIZE,
    "WALL_SOLID_COLOR",
    ()=>WALL_SOLID_COLOR,
    "WALL_THIN_COLOR",
    ()=>WALL_THIN_COLOR,
    "WALL_WIDTH",
    ()=>WALL_WIDTH
]);
const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const TILE_SIZE = 20;
const PLAYER_SIZE = 18;
const WALL_WIDTH = 12;
const GRAVITY = 0.2;
const JUMP_FORCE = -7.0;
const MOVE_SPEED = 1.2;
const TELEPORT_DISTANCE = 90;
const TELEPORT_WINDUP_FRAMES = 10;
const TELEPORT_COOLDOWN_FRAMES = 40;
const NEON_PURPLE = '#a855f7';
const NEON_GREEN = '#00ff88';
const NEON_BLUE = '#00d4ff';
const DARK_BG = '#0a0a12';
const PLATFORM_COLOR = '#00ff8855';
const PLATFORM_BORDER = '#00ffaa';
const WALL_SOLID_COLOR = '#1a1a2e';
const WALL_THIN_COLOR = '#a855f7';
// ============================================================
// Level 1 - "Temporal Grounds" (tutorial, path forces trace-back)
// Layout: player starts bottom-left, flag is bottom-right.
// To reach the flag you go RIGHT across the bottom, then UP the right side.
// Second spawn is top-left, so you MUST descend through your old path.
// ============================================================
const L1_FLOOR_Y = GAME_HEIGHT - 20;
const level1Platforms = [
    // Ground - broken with gaps to force platforming
    {
        x: 0,
        y: L1_FLOOR_Y,
        w: 200,
        h: 20
    },
    {
        x: 240,
        y: L1_FLOOR_Y,
        w: 160,
        h: 20
    },
    {
        x: 440,
        y: L1_FLOOR_Y,
        w: 140,
        h: 20
    },
    {
        x: 680,
        y: L1_FLOOR_Y,
        w: 280,
        h: 20
    },
    // Mid-section stepping stones going right
    {
        x: 160,
        y: 430,
        w: 80,
        h: 12
    },
    {
        x: 300,
        y: 400,
        w: 70,
        h: 12
    },
    {
        x: 420,
        y: 370,
        w: 80,
        h: 12
    },
    // Right tower ascent
    {
        x: 800,
        y: 420,
        w: 100,
        h: 12
    },
    {
        x: 760,
        y: 350,
        w: 80,
        h: 12
    },
    {
        x: 830,
        y: 280,
        w: 90,
        h: 12
    },
    {
        x: 750,
        y: 210,
        w: 80,
        h: 12
    },
    {
        x: 830,
        y: 150,
        w: 100,
        h: 12
    },
    // Top bridge going left (return path for run 2)
    {
        x: 660,
        y: 150,
        w: 80,
        h: 12
    },
    {
        x: 500,
        y: 130,
        w: 80,
        h: 12
    },
    {
        x: 340,
        y: 120,
        w: 80,
        h: 12
    },
    {
        x: 180,
        y: 110,
        w: 80,
        h: 12
    },
    {
        x: 30,
        y: 100,
        w: 100,
        h: 12
    },
    // Mid descent (run 2 crosses run 1 here)
    {
        x: 100,
        y: 220,
        w: 80,
        h: 12
    },
    {
        x: 220,
        y: 290,
        w: 70,
        h: 12
    },
    {
        x: 350,
        y: 300,
        w: 80,
        h: 12
    },
    {
        x: 530,
        y: 280,
        w: 80,
        h: 12
    },
    {
        x: 600,
        y: 340,
        w: 80,
        h: 12
    },
    {
        x: 550,
        y: 430,
        w: 70,
        h: 12
    }
];
const level1Walls = [
    {
        x: 0,
        y: 0,
        w: 12,
        h: GAME_HEIGHT,
        isThin: false
    },
    {
        x: GAME_WIDTH - 12,
        y: 0,
        w: 12,
        h: GAME_HEIGHT,
        isThin: false
    },
    // Thin walls forcing teleport usage
    {
        x: 580,
        y: L1_FLOOR_Y - 80,
        w: WALL_WIDTH,
        h: 80,
        isThin: true
    },
    {
        x: 720,
        y: 210,
        w: WALL_WIDTH,
        h: 80,
        isThin: true
    },
    {
        x: 440,
        y: 120,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    },
    {
        x: 250,
        y: 220,
        w: WALL_WIDTH,
        h: 80,
        isThin: true
    }
];
// ============================================================
// Level 2 - "Neon Abyss"
// Layout: spiral descent. Start top-left, flag bottom-center.
// Second spawn is bottom-right, must ascend through old descent path.
// ============================================================
const level2Platforms = [
    // Top ledges
    {
        x: 30,
        y: 80,
        w: 120,
        h: 12
    },
    {
        x: 200,
        y: 80,
        w: 80,
        h: 12
    },
    {
        x: 360,
        y: 60,
        w: 90,
        h: 12
    },
    {
        x: 540,
        y: 80,
        w: 80,
        h: 12
    },
    {
        x: 700,
        y: 60,
        w: 100,
        h: 12
    },
    {
        x: 850,
        y: 80,
        w: 80,
        h: 12
    },
    // Second tier (right to left)
    {
        x: 780,
        y: 160,
        w: 100,
        h: 12
    },
    {
        x: 620,
        y: 170,
        w: 80,
        h: 12
    },
    {
        x: 470,
        y: 155,
        w: 70,
        h: 12
    },
    {
        x: 310,
        y: 170,
        w: 80,
        h: 12
    },
    {
        x: 140,
        y: 180,
        w: 90,
        h: 12
    },
    // Third tier (left to right)
    {
        x: 50,
        y: 270,
        w: 100,
        h: 12
    },
    {
        x: 210,
        y: 260,
        w: 80,
        h: 12
    },
    {
        x: 360,
        y: 250,
        w: 80,
        h: 12
    },
    {
        x: 510,
        y: 260,
        w: 90,
        h: 12
    },
    {
        x: 670,
        y: 250,
        w: 80,
        h: 12
    },
    {
        x: 820,
        y: 270,
        w: 100,
        h: 12
    },
    // Fourth tier (right to left)
    {
        x: 750,
        y: 350,
        w: 80,
        h: 12
    },
    {
        x: 590,
        y: 360,
        w: 90,
        h: 12
    },
    {
        x: 420,
        y: 350,
        w: 80,
        h: 12
    },
    {
        x: 260,
        y: 360,
        w: 80,
        h: 12
    },
    {
        x: 100,
        y: 370,
        w: 90,
        h: 12
    },
    // Bottom platforms
    {
        x: 180,
        y: 450,
        w: 80,
        h: 12
    },
    {
        x: 340,
        y: 460,
        w: 80,
        h: 12
    },
    {
        x: 500,
        y: 470,
        w: 80,
        h: 12
    },
    {
        x: 660,
        y: 450,
        w: 80,
        h: 12
    },
    // Floor patches
    {
        x: 380,
        y: GAME_HEIGHT - 20,
        w: 200,
        h: 20
    },
    {
        x: 700,
        y: GAME_HEIGHT - 20,
        w: 200,
        h: 20
    }
];
const level2Walls = [
    {
        x: 0,
        y: 0,
        w: 12,
        h: GAME_HEIGHT,
        isThin: false
    },
    {
        x: GAME_WIDTH - 12,
        y: 0,
        w: 12,
        h: GAME_HEIGHT,
        isThin: false
    },
    {
        x: 280,
        y: 60,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    },
    {
        x: 460,
        y: 155,
        w: WALL_WIDTH,
        h: 60,
        isThin: true
    },
    {
        x: 350,
        y: 250,
        w: WALL_WIDTH,
        h: 60,
        isThin: true
    },
    {
        x: 580,
        y: 350,
        w: WALL_WIDTH,
        h: 60,
        isThin: true
    },
    {
        x: 250,
        y: 360,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    },
    {
        x: 700,
        y: 250,
        w: WALL_WIDTH,
        h: 60,
        isThin: true
    }
];
// ============================================================
// Level 3 - "Chrono Spire"
// Layout: central tower with wrapping platforms.
// Start bottom-left, flag at very top center.
// Second spawn is bottom-right, must cross ascending path.
// ============================================================
const level3Platforms = [
    // Ground
    {
        x: 0,
        y: GAME_HEIGHT - 20,
        w: 200,
        h: 20
    },
    {
        x: 760,
        y: GAME_HEIGHT - 20,
        w: 200,
        h: 20
    },
    // Outer left ascent
    {
        x: 40,
        y: 450,
        w: 90,
        h: 12
    },
    {
        x: 30,
        y: 370,
        w: 80,
        h: 12
    },
    {
        x: 50,
        y: 290,
        w: 90,
        h: 12
    },
    {
        x: 30,
        y: 210,
        w: 80,
        h: 12
    },
    // Left-center bridges
    {
        x: 180,
        y: 430,
        w: 70,
        h: 12
    },
    {
        x: 200,
        y: 340,
        w: 80,
        h: 12
    },
    {
        x: 180,
        y: 250,
        w: 70,
        h: 12
    },
    {
        x: 200,
        y: 170,
        w: 80,
        h: 12
    },
    // Central tower
    {
        x: 340,
        y: 460,
        w: 100,
        h: 12
    },
    {
        x: 350,
        y: 380,
        w: 80,
        h: 12
    },
    {
        x: 340,
        y: 300,
        w: 100,
        h: 12
    },
    {
        x: 350,
        y: 220,
        w: 80,
        h: 12
    },
    {
        x: 330,
        y: 140,
        w: 120,
        h: 12
    },
    // Central-right bridges
    {
        x: 520,
        y: 460,
        w: 80,
        h: 12
    },
    {
        x: 530,
        y: 380,
        w: 70,
        h: 12
    },
    {
        x: 510,
        y: 300,
        w: 80,
        h: 12
    },
    {
        x: 530,
        y: 220,
        w: 70,
        h: 12
    },
    {
        x: 510,
        y: 140,
        w: 80,
        h: 12
    },
    // Outer right ascent
    {
        x: 680,
        y: 450,
        w: 90,
        h: 12
    },
    {
        x: 700,
        y: 370,
        w: 80,
        h: 12
    },
    {
        x: 680,
        y: 290,
        w: 90,
        h: 12
    },
    {
        x: 700,
        y: 210,
        w: 80,
        h: 12
    },
    {
        x: 830,
        y: 350,
        w: 80,
        h: 12
    },
    {
        x: 850,
        y: 250,
        w: 80,
        h: 12
    },
    // Top crown
    {
        x: 180,
        y: 100,
        w: 80,
        h: 12
    },
    {
        x: 400,
        y: 60,
        w: 160,
        h: 14
    },
    {
        x: 680,
        y: 100,
        w: 80,
        h: 12
    }
];
const level3Walls = [
    {
        x: 0,
        y: 0,
        w: 12,
        h: GAME_HEIGHT,
        isThin: false
    },
    {
        x: GAME_WIDTH - 12,
        y: 0,
        w: 12,
        h: GAME_HEIGHT,
        isThin: false
    },
    // Central tower walls
    {
        x: 330,
        y: 300,
        w: WALL_WIDTH,
        h: 80,
        isThin: true
    },
    {
        x: 440,
        y: 220,
        w: WALL_WIDTH,
        h: 80,
        isThin: true
    },
    {
        x: 330,
        y: 140,
        w: WALL_WIDTH,
        h: 60,
        isThin: true
    },
    // Outer walls
    {
        x: 160,
        y: 250,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    },
    {
        x: 660,
        y: 290,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    },
    {
        x: 500,
        y: 380,
        w: WALL_WIDTH,
        h: 80,
        isThin: true
    },
    {
        x: 260,
        y: 100,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    },
    {
        x: 600,
        y: 100,
        w: WALL_WIDTH,
        h: 70,
        isThin: true
    }
];
const LEVELS = [
    {
        name: 'TEMPORAL GROUNDS',
        subtitle: 'Learn the basics',
        platforms: level1Platforms,
        walls: level1Walls,
        playerStart: {
            x: 40,
            y: L1_FLOOR_Y - PLAYER_SIZE
        },
        playerStart2: {
            x: 50,
            y: 100 - PLAYER_SIZE
        },
        flag: {
            x: 870,
            y: 150 - 28
        },
        hasTutorial: true
    },
    {
        name: 'NEON ABYSS',
        subtitle: 'Mind the gaps',
        platforms: level2Platforms,
        walls: level2Walls,
        playerStart: {
            x: 50,
            y: 80 - PLAYER_SIZE
        },
        playerStart2: {
            x: 800,
            y: GAME_HEIGHT - 20 - PLAYER_SIZE
        },
        flag: {
            x: 440,
            y: GAME_HEIGHT - 20 - 28
        }
    },
    {
        name: 'CHRONO SPIRE',
        subtitle: 'Ascend the tower',
        platforms: level3Platforms,
        walls: level3Walls,
        playerStart: {
            x: 60,
            y: GAME_HEIGHT - 20 - PLAYER_SIZE
        },
        playerStart2: {
            x: 850,
            y: GAME_HEIGHT - 20 - PLAYER_SIZE
        },
        flag: {
            x: 460,
            y: 60 - 28
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/scanline-overlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScanlineOverlay",
    ()=>ScanlineOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ScanlineOverlay() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 z-50 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.04]",
                style: {
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.15) 2px, rgba(0, 255, 136, 0.15) 4px)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/scanline-overlay.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 h-[4px] w-full animate-scanline opacity-20",
                style: {
                    background: 'linear-gradient(180deg, transparent, rgba(0, 255, 136, 0.3), transparent)',
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/scanline-overlay.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/scanline-overlay.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/scanline-overlay.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = ScanlineOverlay;
var _c;
__turbopack_context__.k.register(_c, "ScanlineOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/title-screen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TitleScreen",
    ()=>TitleScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$scanline$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/scanline-overlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TitleScreen({ onStart }) {
    _s();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [pixels, setPixels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showContent, setShowContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [buttonHidden, setButtonHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pixelsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TitleScreen.useEffect": ()=>{
            const timer = setTimeout({
                "TitleScreen.useEffect.timer": ()=>setShowContent(true)
            }["TitleScreen.useEffect.timer"], 100);
            return ({
                "TitleScreen.useEffect": ()=>clearTimeout(timer)
            })["TitleScreen.useEffect"];
        }
    }["TitleScreen.useEffect"], []);
    // Rasterize the actual button into pixel data using a hidden canvas
    const rasterizeButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TitleScreen.useCallback[rasterizeButton]": ()=>{
            const btn = buttonRef.current;
            const container = containerRef.current;
            if (!btn || !container) return null;
            const rect = btn.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            // Relative position within container
            const bx = rect.left - containerRect.left;
            const by = rect.top - containerRect.top;
            const bw = rect.width;
            const bh = rect.height;
            // Sample colors from the button area
            // Since we can't screenshot, we'll use the button's known styling
            // The button has purple border, purple text "> START <" on dark bg
            const pixelSize = 5;
            const generated = [];
            let id = 0;
            const btnCenterX = bx + bw / 2;
            const btnCenterY = by + bh / 2;
            // Create pixel grid from the button dimensions
            // Approximate text region: center 60% of button
            const textStartX = bw * 0.15;
            const textEndX = bw * 0.85;
            const textStartY = bh * 0.2;
            const textEndY = bh * 0.8;
            for(let px = 0; px < bw; px += pixelSize){
                for(let py = 0; py < bh; py += pixelSize){
                    const inTextRegion = px >= textStartX && px <= textEndX && py >= textStartY && py <= textEndY;
                    // Determine the color of this pixel
                    let color;
                    const isEdge = px < pixelSize || px > bw - pixelSize * 2 || py < pixelSize || py > bh - pixelSize * 2;
                    if (isEdge) {
                        color = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]; // border color
                    } else if (inTextRegion) {
                        // Alternate between text color and background
                        const charIndex = Math.floor((px - textStartX) / (pixelSize * 2));
                        color = charIndex % 3 === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"] : charIndex % 3 === 1 ? '#2a1540' : __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"];
                    } else {
                        // Background of button
                        color = `rgba(40, 15, 60, 0.9)`;
                    }
                    const cx = bx + px + pixelSize / 2;
                    const cy = by + py + pixelSize / 2;
                    // Direction away from center with varying speed
                    const dx = cx - btnCenterX;
                    const dy = cy - btnCenterY;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const edgeBoost = isEdge ? 1.5 : 1;
                    const speed = (1.5 + Math.random() * 3.5) * edgeBoost;
                    generated.push({
                        id: id++,
                        x: cx,
                        y: cy,
                        vx: dx / dist * speed + (Math.random() - 0.5) * 2,
                        vy: dy / dist * speed - Math.random() * 1.5,
                        size: pixelSize - 1,
                        color,
                        opacity: 1,
                        friction: 0.96 + Math.random() * 0.02
                    });
                }
            }
            return generated;
        }
    }["TitleScreen.useCallback[rasterizeButton]"], []);
    const animatePixels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TitleScreen.useCallback[animatePixels]": ()=>{
            const updated = pixelsRef.current.map({
                "TitleScreen.useCallback[animatePixels].updated": (p)=>({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.04,
                        vx: p.vx * p.friction,
                        vy2: p.vy * p.friction,
                        opacity: p.opacity - 0.006
                    })
            }["TitleScreen.useCallback[animatePixels].updated"]);
            // Also apply friction to vy
            for (const p of updated){
                p.vy *= p.friction;
            }
            pixelsRef.current = updated;
            setPixels([
                ...updated
            ]);
            const anyVisible = updated.some({
                "TitleScreen.useCallback[animatePixels].anyVisible": (p)=>p.opacity > 0.05
            }["TitleScreen.useCallback[animatePixels].anyVisible"]);
            if (anyVisible) {
                // Check if most are slowed down - transition to fading
                const avgSpeed = updated.reduce({
                    "TitleScreen.useCallback[animatePixels]": (s, p)=>s + Math.abs(p.vx) + Math.abs(p.vy)
                }["TitleScreen.useCallback[animatePixels]"], 0) / updated.length;
                if (avgSpeed < 0.3 && phase !== 'fading') {
                    setPhase('fading');
                }
                rafRef.current = requestAnimationFrame(animatePixels);
            } else {
                onStart();
            }
        }
    }["TitleScreen.useCallback[animatePixels]"], [
        onStart,
        phase
    ]);
    const handleStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TitleScreen.useCallback[handleStart]": ()=>{
            if (phase !== 'idle') return;
            const generated = rasterizeButton();
            if (!generated || generated.length === 0) {
                onStart();
                return;
            }
            setButtonHidden(true);
            setPhase('exploding');
            pixelsRef.current = generated;
            setPixels(generated);
            // Small delay so the button disappears first
            requestAnimationFrame({
                "TitleScreen.useCallback[handleStart]": ()=>{
                    rafRef.current = requestAnimationFrame(animatePixels);
                }
            }["TitleScreen.useCallback[handleStart]"]);
            return ({
                "TitleScreen.useCallback[handleStart]": ()=>cancelAnimationFrame(rafRef.current)
            })["TitleScreen.useCallback[handleStart]"];
        }
    }["TitleScreen.useCallback[handleStart]"], [
        phase,
        rasterizeButton,
        animatePixels,
        onStart
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        "data-title-container": true,
        className: "relative flex flex-col items-center justify-center overflow-hidden border border-border",
        style: {
            width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"],
            background: '#08060e'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    backgroundImage: 'url(/images/ruins-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    opacity: 0.2,
                    filter: 'brightness(0.6) contrast(1.1)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 opacity-[0.04]",
                style: {
                    backgroundImage: `
            linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44 1px, transparent 1px),
            linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44 1px, transparent 1px)
          `,
                    backgroundSize: '20px 20px'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute",
                style: {
                    width: 400,
                    height: 400,
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: `radial-gradient(circle, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}12 0%, transparent 70%)`
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showContent && phase === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 0.5,
                                y: 0
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                delay: 0.2,
                                duration: 0.6
                            },
                            className: "mb-4 font-mono text-xs tracking-[0.4em] text-muted-foreground",
                            children: "TEMPORAL PLATFORMER"
                        }, void 0, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                            initial: {
                                opacity: 0,
                                scale: 0.8,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95
                            },
                            transition: {
                                duration: 0.8,
                                ease: [
                                    0.16,
                                    1,
                                    0.3,
                                    1
                                ]
                            },
                            className: "mb-2 text-balance text-center font-mono text-5xl font-bold tracking-wider text-foreground",
                            style: {
                                textShadow: `0 0 40px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}88, 0 0 80px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44, 0 0 120px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}22`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]
                                    },
                                    children: "CHRONO"
                                }, void 0, false, {
                                    fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                    },
                                    children: "SHIFT"
                                }, void 0, false, {
                                    fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 0.6
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                delay: 0.5,
                                duration: 0.6
                            },
                            className: "mb-12 font-mono text-sm text-muted-foreground",
                            children: 'Outrun your past. Escape your shadow.'
                        }, void 0, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 0.3
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                delay: 1.2,
                                duration: 0.6
                            },
                            className: "absolute bottom-8 font-mono text-[10px] text-muted-foreground",
                            children: "PRESS START TO INITIALIZE TEMPORAL MATRIX"
                        }, void 0, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            showContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                ref: buttonRef,
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: buttonHidden ? 0 : 1,
                    y: 0
                },
                transition: {
                    delay: buttonHidden ? 0 : 0.8,
                    duration: buttonHidden ? 0.05 : 0.5
                },
                onClick: handleStart,
                className: "relative z-10 cursor-pointer overflow-hidden border-2 bg-transparent px-12 py-4 font-mono text-lg font-bold tracking-widest transition-all duration-200 hover:scale-105 active:scale-95",
                style: {
                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"],
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"],
                    boxShadow: buttonHidden ? 'none' : `0 0 20px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44, inset 0 0 20px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}11`,
                    pointerEvents: buttonHidden ? 'none' : 'auto',
                    visibility: buttonHidden ? 'hidden' : 'visible'
                },
                children: '> START <'
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this),
            pixels.map((p)=>p.opacity > 0.05 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute z-20",
                    style: {
                        left: p.x - p.size / 2,
                        top: p.y - p.size / 2,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        opacity: Math.max(0, p.opacity),
                        boxShadow: p.opacity > 0.5 ? `0 0 ${3 + p.size}px ${p.color}88` : 'none'
                    }
                }, p.id, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                    lineNumber: 304,
                    columnNumber: 13
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: phase === 'fading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 0.6
                    },
                    transition: {
                        duration: 1.5
                    },
                    className: "pointer-events-none absolute inset-0 z-10 bg-background"
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                    lineNumber: 323,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$scanline$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScanlineOverlay"], {}, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/title-screen.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(TitleScreen, "fNcawcbVc/qeYa9hwixLrmMJGB0=");
_c = TitleScreen;
var _c;
__turbopack_context__.k.register(_c, "TitleScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteCustomLevel",
    ()=>deleteCustomLevel,
    "loadCustomLevels",
    ()=>loadCustomLevels,
    "saveCustomLevel",
    ()=>saveCustomLevel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$95$2e$3$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/@supabase+supabase-js@2.95.3/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
'use client';
;
let supabaseInstance = null;
function getSupabaseClient() {
    if (!supabaseInstance) {
        const supabaseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Missing Supabase environment variables');
            throw new Error('Missing Supabase environment variables');
        }
        supabaseInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$95$2e$3$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
    }
    return supabaseInstance;
}
async function loadCustomLevels() {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from('custom_levels').select('*').order('created_at', {
            ascending: false
        });
        if (error) {
            console.error('Error loading custom levels:', error);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Failed to load custom levels:', e);
        return [];
    }
}
async function saveCustomLevel(level) {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from('custom_levels').insert({
            name: level.name,
            subtitle: level.subtitle,
            platforms: level.platforms,
            walls: level.walls,
            playerStart: level.playerStart,
            playerStart2: level.playerStart2,
            flag: level.flag
        }).select();
        if (error) {
            console.error('Error saving custom level:', error);
            throw error;
        }
        return data?.[0];
    } catch (e) {
        console.error('Failed to save custom level:', e);
        throw e;
    }
}
async function deleteCustomLevel(id) {
    try {
        const supabase = getSupabaseClient();
        const { error } = await supabase.from('custom_levels').delete().eq('id', id);
        if (error) {
            console.error('Error deleting custom level:', error);
            throw error;
        }
    } catch (e) {
        console.error('Failed to delete custom level:', e);
        throw e;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/level-select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LevelSelect",
    ()=>LevelSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$scanline$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/scanline-overlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const levelColors = [
    __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
    __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"],
    __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]
];
const levelDifficulty = [
    'EASY',
    'MEDIUM',
    'HARD'
];
function MiniMap({ levelIndex }) {
    const level = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEVELS"][levelIndex];
    const scale = 0.16;
    const color = levelColors[levelIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden",
        style: {
            width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"] * scale,
            height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"] * scale,
            background: '#08060e',
            border: `1px solid ${color}33`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    backgroundImage: 'url(/images/ruins-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    opacity: 0.15
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            level.platforms.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute",
                    style: {
                        left: p.x * scale,
                        top: p.y * scale,
                        width: p.w * scale,
                        height: Math.max(p.h * scale, 1),
                        background: `${color}55`
                    }
                }, `p-${i}`, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)),
            level.walls.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute",
                    style: {
                        left: w.x * scale,
                        top: w.y * scale,
                        width: Math.max(w.w * scale, 1),
                        height: w.h * scale,
                        background: w.isThin ? `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}44` : `${color}22`
                    }
                }, `w-${i}`, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute",
                style: {
                    left: level.playerStart.x * scale,
                    top: level.playerStart.y * scale,
                    width: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] * scale, 2),
                    height: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] * scale, 2),
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                    boxShadow: `0 0 3px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}88`
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            level.flag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute",
                style: {
                    left: level.flag.x * scale,
                    top: level.flag.y * scale,
                    width: 3,
                    height: 5,
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                    boxShadow: `0 0 4px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}66`
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = MiniMap;
function LevelSelect({ onSelect, onBack, onEditLevel, onSelectCustomLevel }) {
    _s();
    const [hoveredIndex, setHoveredIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [customLevels, setCustomLevels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCustom, setShowCustom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LevelSelect.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCustomLevels"])().then(setCustomLevels);
        }
    }["LevelSelect.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col items-center justify-center overflow-hidden border border-border",
        style: {
            width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"],
            background: '#08060e'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    backgroundImage: 'url(/images/ruins-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    opacity: 0.15,
                    filter: 'brightness(0.6)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 opacity-[0.04]",
                style: {
                    backgroundImage: `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44 1px, transparent 1px), linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.5
                },
                className: "mb-2 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-12",
                        style: {
                            background: `linear-gradient(90deg, transparent, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}66)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm font-bold tracking-[0.3em] text-muted-foreground",
                        children: showCustom ? 'CUSTOM LEVELS' : 'SELECT LEVEL'
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-12",
                        style: {
                            background: `linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}66, transparent)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            !showCustom && customLevels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 0.6
                },
                transition: {
                    delay: 0.7
                },
                onClick: ()=>setShowCustom(true),
                className: "z-10 mb-2 cursor-pointer font-mono text-xs tracking-wider text-neon-blue transition-all hover:text-neon-blue hover:opacity-100 border border-neon-blue/30 px-3 py-1",
                style: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]
                },
                children: 'CUSTOM LEVELS (' + customLevels.length + ')'
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this),
            showCustom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 0.6
                },
                transition: {
                    delay: 0.7
                },
                onClick: ()=>setShowCustom(false),
                className: "z-10 mb-2 cursor-pointer font-mono text-xs tracking-wider text-neon-green transition-all hover:text-neon-green hover:opacity-100 border border-neon-green/30 px-3 py-1",
                style: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                },
                children: 'BUILT-IN LEVELS'
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "z-10 flex items-stretch gap-5 px-8 py-6 flex-wrap justify-center",
                children: !showCustom ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEVELS"].map((level, index)=>{
                    const color = levelColors[index];
                    const isHovered = hoveredIndex === index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.2 + index * 0.15,
                            duration: 0.5
                        },
                        onMouseEnter: ()=>setHoveredIndex(index),
                        onMouseLeave: ()=>setHoveredIndex(null),
                        onClick: ()=>onSelect(index),
                        className: "group relative flex cursor-pointer flex-col items-center border bg-transparent px-5 pb-4 pt-3 transition-all duration-300",
                        style: {
                            width: 200,
                            borderColor: isHovered ? `${color}88` : `${color}33`,
                            boxShadow: isHovered ? `0 0 24px ${color}33, inset 0 0 16px ${color}11` : `0 0 8px ${color}11`,
                            background: isHovered ? `linear-gradient(180deg, ${color}08 0%, transparent 100%)` : 'transparent'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 font-mono text-[10px] tracking-widest",
                                style: {
                                    color: `${color}88`
                                },
                                children: [
                                    'LEVEL ',
                                    String(index + 1).padStart(2, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 204,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniMap, {
                                    levelIndex: index
                                }, void 0, false, {
                                    fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                    lineNumber: 207,
                                    columnNumber: 39
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 207,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 font-mono text-xs font-bold tracking-wider",
                                style: {
                                    color,
                                    textShadow: isHovered ? `0 0 12px ${color}66` : 'none'
                                },
                                children: level.name
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 208,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-2 font-mono text-[10px] text-muted-foreground",
                                children: level.subtitle
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 214,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    [
                                        0,
                                        1,
                                        2
                                    ].map((dot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-1.5 w-1.5",
                                            style: {
                                                background: dot <= index ? color : `${color}22`,
                                                boxShadow: dot <= index ? `0 0 4px ${color}66` : 'none'
                                            }
                                        }, dot, false, {
                                            fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                            lineNumber: 217,
                                            columnNumber: 21
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 font-mono text-[9px] tracking-wider",
                                        style: {
                                            color: `${color}88`
                                        },
                                        children: levelDifficulty[index]
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                        lineNumber: 226,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 215,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute bottom-0 left-0 h-[2px]",
                                initial: {
                                    width: '0%'
                                },
                                animate: {
                                    width: isHovered ? '100%' : '0%'
                                },
                                transition: {
                                    duration: 0.3
                                },
                                style: {
                                    background: color,
                                    boxShadow: `0 0 8px ${color}88`
                                }
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 230,
                                columnNumber: 17
                            }, this)
                        ]
                    }, level.name, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 188,
                        columnNumber: 15
                    }, this);
                }) : customLevels.length > 0 ? customLevels.map((level, index)=>{
                    const isHovered = hoveredIndex === 100 + index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.2 + index * 0.15,
                            duration: 0.5
                        },
                        onMouseEnter: ()=>setHoveredIndex(100 + index),
                        onMouseLeave: ()=>setHoveredIndex(null),
                        onClick: ()=>{
                            if (onSelectCustomLevel) {
                                onSelectCustomLevel(level);
                            }
                        },
                        className: "group relative flex cursor-pointer flex-col items-center border bg-transparent px-5 pb-4 pt-3 transition-all duration-300",
                        style: {
                            width: 200,
                            borderColor: isHovered ? `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}88` : `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}33`,
                            boxShadow: isHovered ? `0 0 24px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}33, inset 0 0 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}11` : `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}11`,
                            background: isHovered ? `linear-gradient(180deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}08 0%, transparent 100%)` : 'transparent'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 font-mono text-[10px] tracking-widest",
                                style: {
                                    color: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}88`
                                },
                                children: 'CUSTOM'
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 265,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 w-full h-16 bg-black/50 rounded border border-neon-blue/20"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 268,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 font-mono text-xs font-bold tracking-wider text-center",
                                style: {
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"],
                                    textShadow: isHovered ? `0 0 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}66` : 'none'
                                },
                                children: level.name
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 269,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-2 font-mono text-[10px] text-muted-foreground text-center",
                                children: level.subtitle
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 275,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute bottom-0 left-0 h-[2px]",
                                initial: {
                                    width: '0%'
                                },
                                animate: {
                                    width: isHovered ? '100%' : '0%'
                                },
                                transition: {
                                    duration: 0.3
                                },
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"],
                                    boxShadow: `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}88`
                                }
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                                lineNumber: 276,
                                columnNumber: 19
                            }, this)
                        ]
                    }, level.id, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 245,
                        columnNumber: 17
                    }, this);
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-muted-foreground font-mono text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No custom levels yet"
                        }, void 0, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                            lineNumber: 288,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs mt-2",
                            children: "Create one with the Level Editor!"
                        }, void 0, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                            lineNumber: 289,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                    lineNumber: 287,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "z-10 mt-4 flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 0.5
                        },
                        transition: {
                            delay: 0.8
                        },
                        onClick: onEditLevel,
                        className: "cursor-pointer font-mono text-xs tracking-wider text-neon-blue transition-all hover:text-neon-blue hover:opacity-100 border border-neon-blue/30 px-3 py-1",
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]
                        },
                        children: 'LEVEL EDITOR'
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 0.5
                        },
                        transition: {
                            delay: 0.8
                        },
                        onClick: onBack,
                        className: "cursor-pointer font-mono text-xs tracking-wider text-muted-foreground transition-all hover:text-foreground hover:opacity-100",
                        children: '< BACK'
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$scanline$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScanlineOverlay"], {}, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/level-select.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(LevelSelect, "U6V6K9JVvjL1xzLdMYmrWmHoTIU=");
_c1 = LevelSelect;
var _c, _c1;
__turbopack_context__.k.register(_c, "MiniMap");
__turbopack_context__.k.register(_c1, "LevelSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/use-game-loop.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGameLoop",
    ()=>useGameLoop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}
const FLAG_W = 18;
const FLAG_H = 28;
function useGameLoop(level) {
    _s();
    const keysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const levelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(level);
    levelRef.current = level;
    const gameStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        playerPos: {
            ...level.playerStart
        },
        playerVel: {
            x: 0,
            y: 0
        },
        isGrounded: false,
        isTeleporting: false,
        teleportCooldown: 0,
        teleportWindup: 0,
        teleportDir: 0,
        teleportOriginX: 0,
        movementHistory: [],
        shadowHistory: null,
        shadowFrame: 0,
        shadowPos: null,
        isGlitching: false,
        runNumber: 0,
        frameCount: 0,
        teleportTrails: [],
        trailIdCounter: 0,
        reachedFlag: false,
        showFlagMessage: false,
        flagMessageTimer: 0,
        tutorialStep: level.hasTutorial ? 'move' : 'done',
        tutorialMoved: false,
        tutorialJumped: false,
        tutorialTeleported: false,
        hasLost: false,
        showLoseMessage: false,
        loseMessageTimer: 0
    });
    const [renderState, setRenderState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        playerPos: {
            ...level.playerStart
        },
        shadowPos: null,
        isGlitching: false,
        isTeleporting: false,
        isWindingUp: false,
        runNumber: 0,
        frameCount: 0,
        teleportTrails: [],
        reachedFlag: false,
        showFlagMessage: false,
        tutorialStep: level.hasTutorial ? 'move' : 'done',
        hasLost: false,
        showLoseMessage: false
    });
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const restart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLoop.useCallback[restart]": ()=>{
            const gs = gameStateRef.current;
            const lev = levelRef.current;
            gs.shadowHistory = gs.movementHistory.length > 0 ? [
                ...gs.movementHistory
            ] : gs.shadowHistory;
            gs.movementHistory = [];
            // Use second spawn point if we've reached the flag at least once
            const spawn = gs.reachedFlag ? lev.playerStart2 ?? lev.playerStart : lev.playerStart;
            gs.playerPos = {
                ...spawn
            };
            gs.playerVel = {
                x: 0,
                y: 0
            };
            gs.isGrounded = false;
            gs.isTeleporting = false;
            gs.teleportCooldown = 0;
            gs.teleportWindup = 0;
            gs.teleportDir = 0;
            gs.teleportOriginX = 0;
            gs.shadowFrame = 0;
            gs.shadowPos = gs.shadowHistory ? gs.shadowHistory[0] : null;
            gs.isGlitching = false;
            gs.runNumber += 1;
            gs.frameCount = 0;
            gs.teleportTrails = [];
            gs.showFlagMessage = false;
            gs.flagMessageTimer = 0;
            gs.hasLost = false;
            gs.showLoseMessage = false;
            gs.loseMessageTimer = 0;
            // Tutorial is done after first restart
            if (gs.tutorialStep !== 'done') {
                gs.tutorialStep = 'done';
            }
        }
    }["useGameLoop.useCallback[restart]"], []);
    const triggerGlitch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLoop.useCallback[triggerGlitch]": ()=>{
            const gs = gameStateRef.current;
            gs.isGlitching = true;
            setRenderState({
                "useGameLoop.useCallback[triggerGlitch]": (prev)=>({
                        ...prev,
                        isGlitching: true
                    })
            }["useGameLoop.useCallback[triggerGlitch]"]);
            setTimeout({
                "useGameLoop.useCallback[triggerGlitch]": ()=>{
                    restart();
                    setRenderState({
                        "useGameLoop.useCallback[triggerGlitch]": (prev)=>({
                                ...prev,
                                isGlitching: false
                            })
                    }["useGameLoop.useCallback[triggerGlitch]"]);
                }
            }["useGameLoop.useCallback[triggerGlitch]"], 600);
        }
    }["useGameLoop.useCallback[triggerGlitch]"], [
        restart
    ]);
    const checkPlatformCollisions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLoop.useCallback[checkPlatformCollisions]": (pos, vel, platforms)=>{
            let grounded = false;
            const newPos = {
                ...pos
            };
            const newVel = {
                ...vel
            };
            for (const plat of platforms){
                if (rectsOverlap(newPos.x, newPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], plat.x, plat.y, plat.w, plat.h)) {
                    if (vel.y > 0 && pos.y + __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] <= plat.y + vel.y + 1) {
                        newPos.y = plat.y - __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"];
                        newVel.y = 0;
                        grounded = true;
                    } else if (vel.y < 0 && pos.y >= plat.y + plat.h - 1) {
                        newPos.y = plat.y + plat.h;
                        newVel.y = 0;
                    } else if (vel.x > 0 && pos.x + __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] <= plat.x + 2) {
                        newPos.x = plat.x - __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"];
                    } else if (vel.x < 0 && pos.x >= plat.x + plat.w - 2) {
                        newPos.x = plat.x + plat.w;
                    }
                }
            }
            return {
                pos: newPos,
                vel: newVel,
                grounded
            };
        }
    }["useGameLoop.useCallback[checkPlatformCollisions]"], []);
    const checkWallCollisions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLoop.useCallback[checkWallCollisions]": (pos, vel, isTeleporting, walls)=>{
            const newPos = {
                ...pos
            };
            for (const wall of walls){
                if (isTeleporting && wall.isThin) continue;
                if (rectsOverlap(newPos.x, newPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], wall.x, wall.y, wall.w, wall.h)) {
                    if (vel.x > 0) {
                        newPos.x = wall.x - __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"];
                    } else if (vel.x < 0) {
                        newPos.x = wall.x + wall.w;
                    }
                }
            }
            return newPos;
        }
    }["useGameLoop.useCallback[checkWallCollisions]"], []);
    const gameLoop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLoop.useCallback[gameLoop]": ()=>{
            const gs = gameStateRef.current;
            const lev = levelRef.current;
            if (gs.isGlitching) {
                rafRef.current = requestAnimationFrame(gameLoop);
                return;
            }
            // If showing flag message, just tick the timer
            if (gs.showFlagMessage) {
                gs.flagMessageTimer++;
                if (gs.flagMessageTimer > 120) {
                    gs.showFlagMessage = false;
                    // Auto-restart after showing message
                    restart();
                    setRenderState({
                        "useGameLoop.useCallback[gameLoop]": (prev)=>({
                                ...prev,
                                showFlagMessage: false
                            })
                    }["useGameLoop.useCallback[gameLoop]"]);
                }
                rafRef.current = requestAnimationFrame(gameLoop);
                return;
            }
            // If showing lose message, just tick the timer (wait for manual retry)
            if (gs.showLoseMessage) {
                gs.loseMessageTimer++;
                setRenderState({
                    "useGameLoop.useCallback[gameLoop]": (prev)=>({
                            ...prev,
                            showLoseMessage: true,
                            hasLost: true
                        })
                }["useGameLoop.useCallback[gameLoop]"]);
                rafRef.current = requestAnimationFrame(gameLoop);
                return;
            }
            // If player has lost, don't update game state
            if (gs.hasLost) {
                rafRef.current = requestAnimationFrame(gameLoop);
                return;
            }
            const keys = keysRef.current;
            // Age and remove old trails
            gs.teleportTrails = gs.teleportTrails.map({
                "useGameLoop.useCallback[gameLoop]": (t)=>({
                        ...t,
                        frame: t.frame + 1
                    })
            }["useGameLoop.useCallback[gameLoop]"]).filter({
                "useGameLoop.useCallback[gameLoop]": (t)=>t.frame < 20
            }["useGameLoop.useCallback[gameLoop]"]);
            // ===== TELEPORT WINDUP =====
            if (gs.teleportWindup > 0) {
                gs.teleportWindup--;
                gs.playerVel.x = 0;
                if (gs.teleportWindup === 0) {
                    const originX = gs.playerPos.x;
                    gs.isTeleporting = true;
                    gs.playerPos.x += gs.teleportDir * __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TELEPORT_DISTANCE"];
                    gs.playerPos.x = Math.max(12, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"] - 12 - __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], gs.playerPos.x));
                    gs.teleportCooldown = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TELEPORT_COOLDOWN_FRAMES"];
                    const startX = originX;
                    const endX = gs.playerPos.x;
                    const steps = 6;
                    for(let i = 0; i <= steps; i++){
                        const t = i / steps;
                        gs.teleportTrails.push({
                            id: gs.trailIdCounter++,
                            x: startX + (endX - startX) * t,
                            y: gs.playerPos.y + (Math.random() - 0.5) * 10,
                            targetX: endX,
                            frame: 0
                        });
                    }
                    gs.playerVel.x = 0;
                    // Tutorial: teleport done
                    if (!gs.tutorialTeleported) {
                        gs.tutorialTeleported = true;
                        if (gs.tutorialStep === 'teleport') gs.tutorialStep = 'restart';
                    }
                }
                gs.movementHistory.push({
                    x: gs.playerPos.x,
                    y: gs.playerPos.y
                });
                // Shadow update during windup
                if (gs.shadowHistory && gs.shadowFrame < gs.shadowHistory.length) {
                    gs.shadowPos = gs.shadowHistory[gs.shadowFrame];
                    gs.shadowFrame++;
                    if (gs.shadowPos) {
                        const overlap = rectsOverlap(gs.playerPos.x, gs.playerPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], gs.shadowPos.x, gs.shadowPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"]);
                        if (overlap && gs.frameCount > 10) {
                            triggerGlitch();
                            rafRef.current = requestAnimationFrame(gameLoop);
                            return;
                        }
                    }
                } else if (gs.shadowHistory && gs.shadowFrame >= gs.shadowHistory.length) {
                    gs.shadowPos = null;
                }
                gs.frameCount++;
                setRenderState({
                    playerPos: {
                        ...gs.playerPos
                    },
                    shadowPos: gs.shadowPos ? {
                        ...gs.shadowPos
                    } : null,
                    isGlitching: gs.isGlitching,
                    isTeleporting: false,
                    isWindingUp: true,
                    runNumber: gs.runNumber,
                    frameCount: gs.frameCount,
                    teleportTrails: [
                        ...gs.teleportTrails
                    ],
                    reachedFlag: gs.reachedFlag,
                    showFlagMessage: gs.showFlagMessage,
                    tutorialStep: gs.tutorialStep
                });
                rafRef.current = requestAnimationFrame(gameLoop);
                return;
            }
            // ===== NORMAL MOVEMENT =====
            gs.isTeleporting = false;
            let moveX = 0;
            if (keys.has('ArrowLeft') || keys.has('a')) moveX = -__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVE_SPEED"];
            if (keys.has('ArrowRight') || keys.has('d')) moveX = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVE_SPEED"];
            gs.playerVel.x = moveX;
            // Tutorial: movement detected
            if (moveX !== 0 && !gs.tutorialMoved) {
                gs.tutorialMoved = true;
                if (gs.tutorialStep === 'move') gs.tutorialStep = 'jump';
            }
            // Jump
            if ((keys.has('ArrowUp') || keys.has('w') || keys.has(' ')) && gs.isGrounded) {
                gs.playerVel.y = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JUMP_FORCE"];
                gs.isGrounded = false;
                // Tutorial: jump done
                if (!gs.tutorialJumped) {
                    gs.tutorialJumped = true;
                    if (gs.tutorialStep === 'jump') gs.tutorialStep = 'teleport';
                }
            }
            // Teleport initiation
            if (gs.teleportCooldown > 0) gs.teleportCooldown--;
            if (keys.has('Shift') && gs.teleportCooldown === 0 && moveX !== 0) {
                gs.teleportWindup = __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TELEPORT_WINDUP_FRAMES"];
                gs.teleportDir = moveX > 0 ? 1 : -1;
                gs.teleportOriginX = gs.playerPos.x;
                gs.playerVel.x = 0;
            }
            // Gravity
            gs.playerVel.y += __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRAVITY"];
            // Apply velocity
            gs.playerPos.x += gs.playerVel.x;
            gs.playerPos.y += gs.playerVel.y;
            // Clamp to game bounds
            gs.playerPos.x = Math.max(12, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"] - 12 - __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], gs.playerPos.x));
            if (gs.playerPos.y > __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"] + 40) {
                // Fell off - reset to spawn
                const spawn = gs.reachedFlag && gs.runNumber > 0 ? lev.playerStart2 ?? lev.playerStart : lev.playerStart;
                gs.playerPos = {
                    ...spawn
                };
                gs.playerVel = {
                    x: 0,
                    y: 0
                };
            }
            // Check collisions
            const wallResult = checkWallCollisions(gs.playerPos, gs.playerVel, gs.isTeleporting, lev.walls);
            gs.playerPos = wallResult;
            const platResult = checkPlatformCollisions(gs.playerPos, gs.playerVel, lev.platforms);
            gs.playerPos = platResult.pos;
            gs.playerVel = platResult.vel;
            gs.isGrounded = platResult.grounded;
            // ===== FLAG CHECK =====
            if (lev.flag) {
                const flagOverlap = rectsOverlap(gs.playerPos.x, gs.playerPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], lev.flag.x, lev.flag.y, FLAG_W, FLAG_H);
                if (flagOverlap && !gs.showFlagMessage) {
                    gs.reachedFlag = true;
                    gs.showFlagMessage = true;
                    gs.flagMessageTimer = 0;
                }
            }
            // Record movement
            gs.movementHistory.push({
                x: gs.playerPos.x,
                y: gs.playerPos.y
            });
            // Update shadow
            if (gs.shadowHistory && gs.shadowFrame < gs.shadowHistory.length) {
                gs.shadowPos = gs.shadowHistory[gs.shadowFrame];
                gs.shadowFrame++;
                if (gs.shadowPos) {
                    const overlap = rectsOverlap(gs.playerPos.x, gs.playerPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], gs.shadowPos.x, gs.shadowPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"]);
                    if (overlap && gs.frameCount > 10) {
                        triggerGlitch();
                        rafRef.current = requestAnimationFrame(gameLoop);
                        return;
                    }
                    // Check if shadow reached flag before player
                    if (lev.flag && gs.runNumber > 0 && !gs.reachedFlag) {
                        const shadowFlagOverlap = rectsOverlap(gs.shadowPos.x, gs.shadowPos.y, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"], lev.flag.x, lev.flag.y, FLAG_W, FLAG_H);
                        if (shadowFlagOverlap) {
                            gs.hasLost = true;
                            gs.showLoseMessage = true;
                            gs.loseMessageTimer = 0;
                        }
                    }
                }
            } else if (gs.shadowHistory && gs.shadowFrame >= gs.shadowHistory.length) {
                gs.shadowPos = null;
            }
            gs.frameCount++;
            setRenderState({
                playerPos: {
                    ...gs.playerPos
                },
                shadowPos: gs.shadowPos ? {
                    ...gs.shadowPos
                } : null,
                isGlitching: gs.isGlitching,
                isTeleporting: gs.isTeleporting,
                isWindingUp: false,
                runNumber: gs.runNumber,
                frameCount: gs.frameCount,
                teleportTrails: [
                    ...gs.teleportTrails
                ],
                reachedFlag: gs.reachedFlag,
                showFlagMessage: gs.showFlagMessage,
                tutorialStep: gs.tutorialStep,
                hasLost: gs.hasLost,
                showLoseMessage: gs.showLoseMessage
            });
            rafRef.current = requestAnimationFrame(gameLoop);
        }
    }["useGameLoop.useCallback[gameLoop]"], [
        checkPlatformCollisions,
        checkWallCollisions,
        triggerGlitch,
        restart
    ]);
    // Reset state when level changes
    const prevLevelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(level.name);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGameLoop.useEffect": ()=>{
            if (prevLevelRef.current !== level.name) {
                prevLevelRef.current = level.name;
                const gs = gameStateRef.current;
                gs.playerPos = {
                    ...level.playerStart
                };
                gs.playerVel = {
                    x: 0,
                    y: 0
                };
                gs.isGrounded = false;
                gs.isTeleporting = false;
                gs.teleportCooldown = 0;
                gs.teleportWindup = 0;
                gs.teleportDir = 0;
                gs.teleportOriginX = 0;
                gs.movementHistory = [];
                gs.shadowHistory = null;
                gs.shadowFrame = 0;
                gs.shadowPos = null;
                gs.isGlitching = false;
                gs.runNumber = 0;
                gs.frameCount = 0;
                gs.teleportTrails = [];
                gs.reachedFlag = false;
                gs.showFlagMessage = false;
                gs.flagMessageTimer = 0;
                gs.hasLost = false;
                gs.showLoseMessage = false;
                gs.loseMessageTimer = 0;
                gs.tutorialStep = level.hasTutorial ? 'move' : 'done';
                gs.tutorialMoved = false;
                gs.tutorialJumped = false;
                gs.tutorialTeleported = false;
            }
        }
    }["useGameLoop.useEffect"], [
        level
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGameLoop.useEffect": ()=>{
            const handleKeyDown = {
                "useGameLoop.useEffect.handleKeyDown": (e)=>{
                    keysRef.current.add(e.key);
                    if ([
                        'ArrowUp',
                        'ArrowDown',
                        'ArrowLeft',
                        'ArrowRight',
                        ' '
                    ].includes(e.key)) {
                        e.preventDefault();
                    }
                    if (e.key === 'r' || e.key === 'R') {
                        const gs = gameStateRef.current;
                        // Tutorial: restart done
                        if (gs.tutorialStep === 'restart') {
                            gs.tutorialStep = 'done';
                        }
                        restart();
                    }
                }
            }["useGameLoop.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "useGameLoop.useEffect.handleKeyUp": (e)=>{
                    keysRef.current.delete(e.key);
                }
            }["useGameLoop.useEffect.handleKeyUp"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            rafRef.current = requestAnimationFrame(gameLoop);
            return ({
                "useGameLoop.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                    cancelAnimationFrame(rafRef.current);
                }
            })["useGameLoop.useEffect"];
        }
    }["useGameLoop.useEffect"], [
        gameLoop,
        restart
    ]);
    return {
        ...renderState,
        restart,
        hasLost: renderState.hasLost,
        showLoseMessage: renderState.showLoseMessage
    };
}
_s(useGameLoop, "hue1MMcfYKXfOnFVDlgH/FU/lHs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/game-canvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameCanvas",
    ()=>GameCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$scanline$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/scanline-overlay.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
// Platform blocks - bright cyan/green outline to contrast purple bg
function PlatformBlock({ x, y, w, h }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute",
        style: {
            left: x,
            top: y,
            width: w,
            height: h,
            background: 'rgba(0, 20, 30, 0.85)',
            borderTop: `2px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}88`,
            borderLeft: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}33`,
            borderRight: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}33`,
            boxShadow: `0 -2px 10px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}20, inset 0 2px 6px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}10`
        }
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = PlatformBlock;
// Wall blocks - cyan for solid, purple stripes for thin
function WallBlock({ x, y, w, h, isThin }) {
    if (!isThin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute",
            style: {
                left: x,
                top: y,
                width: w,
                height: h,
                background: 'rgba(0, 10, 20, 0.9)',
                borderRight: x === 0 ? `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}33` : 'none',
                borderLeft: x !== 0 ? `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}33` : 'none'
            }
        }, void 0, false, {
            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute",
        style: {
            left: x,
            top: y,
            width: w,
            height: h,
            background: `repeating-linear-gradient(
          0deg,
          ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}44 0px,
          ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}44 3px,
          transparent 3px,
          transparent 6px
        )`,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}55`,
            boxShadow: `0 0 10px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}20, inset 0 0 6px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}10`
        }
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c1 = WallBlock;
// Flag at the level endpoint
function Flag({ x, y, pulse }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute",
        style: {
            left: x,
            top: y
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute",
                style: {
                    left: 2,
                    top: 0,
                    width: 2,
                    height: 28,
                    background: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}cc`,
                    boxShadow: `0 0 6px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44`
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: pulse ? {
                    boxShadow: [
                        `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44`,
                        `0 0 20px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}88`,
                        `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44`
                    ]
                } : {},
                transition: {
                    duration: 1.5,
                    repeat: Infinity
                },
                style: {
                    position: 'absolute',
                    left: 4,
                    top: 1,
                    width: 12,
                    height: 10,
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                    boxShadow: `0 0 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}66`,
                    clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute",
                style: {
                    left: -4,
                    top: 24,
                    width: 14,
                    height: 4,
                    background: `radial-gradient(ellipse, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}33 0%, transparent 70%)`
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_c2 = Flag;
function TeleportTrailParticle({ trail }) {
    const progress = trail.frame / 20;
    const opacity = 1 - progress;
    const size = 8 * (1 - progress * 0.5);
    const blur = 3 + progress * 6;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute",
        style: {
            left: trail.x - size / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] / 2,
            top: trail.y - size / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] / 2,
            width: size,
            height: size,
            opacity,
            background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"],
            borderRadius: '50%',
            boxShadow: `0 0 ${blur}px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}cc, 0 0 ${blur * 2}px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}66`,
            filter: `blur(${progress * 2}px)`
        }
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
}
_c3 = TeleportTrailParticle;
function Player({ pos, isTeleporting, isWindingUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isWindingUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.5
                    },
                    animate: {
                        opacity: [
                            0.4,
                            0.8,
                            0.4
                        ],
                        scale: [
                            1,
                            1.4,
                            1
                        ]
                    },
                    exit: {
                        opacity: 0,
                        scale: 2
                    },
                    transition: {
                        duration: 0.15,
                        repeat: Infinity
                    },
                    className: "pointer-events-none absolute",
                    style: {
                        left: pos.x - 5,
                        top: pos.y - 5,
                        width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] + 10,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] + 10,
                        background: `radial-gradient(circle, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}44 0%, transparent 70%)`,
                        borderRadius: '50%',
                        boxShadow: `0 0 20px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}66`
                    }
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isTeleporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0.9,
                        scaleX: 4,
                        scaleY: 0.6
                    },
                    animate: {
                        opacity: 0,
                        scaleX: 0.2,
                        scaleY: 0.3
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.5,
                        ease: 'easeOut'
                    },
                    className: "pointer-events-none absolute",
                    style: {
                        left: pos.x,
                        top: pos.y + __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] * 0.2,
                        width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"],
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"] * 0.6,
                        background: `linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}00, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}88, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}00)`,
                        filter: 'blur(4px)',
                        boxShadow: `0 0 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}66`
                    }
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute",
                animate: {
                    scale: isWindingUp ? [
                        1,
                        0.85,
                        1,
                        0.85
                    ] : isTeleporting ? [
                        0.5,
                        1.15,
                        1
                    ] : 1,
                    opacity: isWindingUp ? [
                        1,
                        0.7,
                        1,
                        0.7
                    ] : 1
                },
                transition: {
                    duration: isWindingUp ? 0.15 : 0.2,
                    repeat: isWindingUp ? Infinity : 0
                },
                style: {
                    left: pos.x,
                    top: pos.y,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"],
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"],
                    background: isWindingUp ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"] : __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                    boxShadow: isWindingUp ? `0 0 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}aa, 0 0 32px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}44` : `0 0 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}88, 0 0 24px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44, inset 0 0 6px rgba(255,255,255,0.2)`,
                    border: `1px solid ${isWindingUp ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"] : __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}cc`,
                    transition: 'background 0.1s, box-shadow 0.1s'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-[3px]",
                    style: {
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)'
                    }
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c4 = Player;
function Shadow({ pos }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0
        },
        animate: {
            opacity: 0.5,
            scale: 1
        },
        className: "absolute",
        style: {
            left: pos.x,
            top: pos.y,
            width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SIZE"],
            background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"],
            boxShadow: `0 0 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}66, 0 0 32px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}33`,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}88`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-[3px]",
            style: {
                border: `1px dashed ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}aa`,
                background: `linear-gradient(135deg, rgba(168,85,247,0.2) 0%, transparent 50%)`
            }
        }, void 0, false, {
            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
            lineNumber: 266,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
_c5 = Shadow;
// Tutorial step-by-step overlay
const TUTORIAL_MESSAGES = {
    move: {
        title: 'MOVE',
        keys: 'A / D  or  LEFT / RIGHT',
        sub: 'Press a movement key to continue'
    },
    jump: {
        title: 'JUMP',
        keys: 'W  or  SPACE',
        sub: 'Jump to reach higher platforms'
    },
    teleport: {
        title: 'TELEPORT',
        keys: 'SHIFT + DIRECTION',
        sub: 'Phase through thin walls'
    },
    restart: {
        title: 'RESTART',
        keys: 'R',
        sub: 'Spawns your shadow to retrace your path'
    },
    done: null
};
function TutorialOverlay({ step }) {
    const msg = TUTORIAL_MESSAGES[step];
    if (!msg) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -10
        },
        className: "pointer-events-none absolute left-0 right-0 top-6 z-30 flex flex-col items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center border px-6 py-3",
            style: {
                background: 'rgba(0, 0, 0, 0.85)',
                borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44`,
                boxShadow: `0 0 20px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}15`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-[10px] tracking-[0.3em]",
                    style: {
                        color: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}88`
                    },
                    children: 'TUTORIAL'
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 305,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-1 font-mono text-lg font-bold tracking-wider",
                    style: {
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                        textShadow: `0 0 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}66`
                    },
                    children: msg.title
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 311,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 flex gap-2",
                    children: msg.keys.split('  ').map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "border px-2 py-1 font-mono text-xs text-foreground",
                            style: {
                                borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44`,
                                background: 'rgba(0, 255, 136, 0.08)'
                            },
                            children: k.trim()
                        }, i, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                            lineNumber: 319,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-2 font-mono text-[10px] text-muted-foreground",
                    children: msg.sub
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
            lineNumber: 297,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
_c6 = TutorialOverlay;
// "You already know this" popup
function FlagMessage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.9
        },
        className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center border px-10 py-6",
            style: {
                background: 'rgba(0, 0, 0, 0.9)',
                borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}66`,
                boxShadow: `0 0 40px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}22`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    animate: {
                        opacity: [
                            1,
                            0.6,
                            1
                        ]
                    },
                    transition: {
                        duration: 1.5,
                        repeat: Infinity
                    },
                    className: "font-mono text-xl font-bold tracking-wider",
                    style: {
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"],
                        textShadow: `0 0 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}88`
                    },
                    children: "YOU ALREADY KNOW THIS"
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 356,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-2 font-mono text-xs text-muted-foreground",
                    children: 'Your shadow will retrace your steps...'
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
            lineNumber: 348,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
_c7 = FlagMessage;
// "You're too slow" message
function LoseMessage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            scale: 0.9
        },
        className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center border px-12 py-8",
            style: {
                background: 'rgba(0, 0, 0, 0.95)',
                borderColor: `#ff4444aa`,
                boxShadow: `0 0 40px #ff444444`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    animate: {
                        opacity: [
                            1,
                            0.5,
                            1
                        ]
                    },
                    transition: {
                        duration: 0.8,
                        repeat: Infinity
                    },
                    className: "font-mono text-2xl font-bold tracking-wider",
                    style: {
                        color: '#ff5555',
                        textShadow: `0 0 16px #ff555599`
                    },
                    children: "YOU'RE TOO SLOW"
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 389,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-3 font-mono text-xs text-muted-foreground",
                    children: 'Your shadow reached the flag first...'
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 397,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-3 font-mono text-xs",
                    style: {
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                    },
                    children: 'Click RETRY or press R to try again'
                }, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 400,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
            lineNumber: 381,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 375,
        columnNumber: 5
    }, this);
}
_c8 = LoseMessage;
function GameCanvas({ level, playerPos, shadowPos, isGlitching, isTeleporting, isWindingUp, teleportTrails, reachedFlag, showFlagMessage, tutorialStep, hasLost, showLoseMessage }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden border border-border ${isGlitching ? 'animate-glitch' : ''}`,
        style: {
            width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"],
            background: '#08060e'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    backgroundImage: 'url(/images/ruins-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    opacity: 0.35,
                    filter: 'brightness(0.7) contrast(1.1)'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 opacity-[0.03]",
                style: {
                    backgroundImage: `
            linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44 1px, transparent 1px),
            linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}44 1px, transparent 1px)
          `,
                    backgroundSize: '20px 20px'
                }
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, this),
            level.platforms.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlatformBlock, {
                    x: p.x,
                    y: p.y,
                    w: p.w,
                    h: p.h
                }, `plat-${i}`, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 457,
                    columnNumber: 9
                }, this)),
            level.walls.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallBlock, {
                    x: w.x,
                    y: w.y,
                    w: w.w,
                    h: w.h,
                    isThin: w.isThin
                }, `wall-${i}`, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 462,
                    columnNumber: 9
                }, this)),
            level.flag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Flag, {
                x: level.flag.x,
                y: level.flag.y,
                pulse: !reachedFlag
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 467,
                columnNumber: 9
            }, this),
            teleportTrails.map((trail)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeleportTrailParticle, {
                    trail: trail
                }, trail.id, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 472,
                    columnNumber: 9
                }, this)),
            shadowPos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Shadow, {
                pos: shadowPos
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 476,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Player, {
                pos: playerPos,
                isTeleporting: isTeleporting,
                isWindingUp: isWindingUp
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: tutorialStep !== 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TutorialOverlay, {
                    step: tutorialStep
                }, tutorialStep, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 484,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 482,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showFlagMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagMessage, {}, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 490,
                    columnNumber: 29
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showLoseMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoseMessage, {}, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 495,
                    columnNumber: 29
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 494,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isGlitching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "absolute inset-0 z-40",
                    style: {
                        background: `repeating-linear-gradient(
                0deg,
                ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}22 0px,
                transparent 2px,
                transparent 4px
              )`,
                        mixBlendMode: 'screen'
                    },
                    children: [
                        Array.from({
                            length: 8
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                animate: {
                                    x: [
                                        0,
                                        Math.random() * 40 - 20,
                                        Math.random() * -30,
                                        0
                                    ],
                                    opacity: [
                                        0.8,
                                        1,
                                        0.6,
                                        0.9
                                    ]
                                },
                                transition: {
                                    duration: 0.15,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    delay: i * 0.02
                                },
                                className: "absolute w-full",
                                style: {
                                    top: `${i / 8 * 100}%`,
                                    height: `${100 / 8}%`,
                                    background: i % 2 === 0 ? `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}15` : `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}10`
                                }
                            }, i, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                                lineNumber: 517,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            style: {
                                textShadow: `0 0 20px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                animate: {
                                    opacity: [
                                        1,
                                        0,
                                        1,
                                        0.5,
                                        1
                                    ]
                                },
                                transition: {
                                    duration: 0.3,
                                    repeat: Infinity
                                },
                                className: "font-mono text-xl font-bold text-neon-purple",
                                children: "TEMPORAL COLLISION"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                                lineNumber: 541,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                            lineNumber: 537,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                    lineNumber: 501,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 499,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$scanline$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScanlineOverlay"], {}, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
                lineNumber: 553,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/game-canvas.tsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
}
_c9 = GameCanvas;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "PlatformBlock");
__turbopack_context__.k.register(_c1, "WallBlock");
__turbopack_context__.k.register(_c2, "Flag");
__turbopack_context__.k.register(_c3, "TeleportTrailParticle");
__turbopack_context__.k.register(_c4, "Player");
__turbopack_context__.k.register(_c5, "Shadow");
__turbopack_context__.k.register(_c6, "TutorialOverlay");
__turbopack_context__.k.register(_c7, "FlagMessage");
__turbopack_context__.k.register(_c8, "LoseMessage");
__turbopack_context__.k.register(_c9, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/game-hud.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameHUD",
    ()=>GameHUD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
'use client';
;
;
;
function GameHUD({ runNumber, frameCount, hasShadow, reachedFlag, onRestart, onBack, hasLost }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-4 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 w-2 rounded-full",
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                                    boxShadow: `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}66`
                                }
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs",
                                style: {
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                },
                                children: [
                                    'RUN #',
                                    String(runNumber).padStart(3, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-muted-foreground",
                        children: [
                            'FRM:',
                            String(frameCount).padStart(5, '0')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    hasShadow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        className: "font-mono text-xs",
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"],
                            textShadow: `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}66`
                        },
                        children: "SHADOW ACTIVE"
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    reachedFlag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-muted-foreground",
                        children: "FLAG REACHED"
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground",
                        children: "LEVELS"
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRestart,
                        className: "border px-3 py-1 font-mono text-xs transition-all",
                        style: {
                            borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}33`,
                            background: `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}11`,
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.borderColor = `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}66`;
                            e.currentTarget.style.background = `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}22`;
                            e.currentTarget.style.boxShadow = `0 0 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}33`;
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.borderColor = `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}33`;
                            e.currentTarget.style.background = `${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}11`;
                            e.currentTarget.style.boxShadow = 'none';
                        },
                        children: hasLost ? 'RETRY [R]' : 'RESTART [R]'
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/game-hud.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = GameHUD;
var _c;
__turbopack_context__.k.register(_c, "GameHUD");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/controls-help.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlsHelp",
    ()=>ControlsHelp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ControlsHelp() {
    const keys = [
        {
            label: 'MOVE',
            keys: [
                'A',
                'D'
            ]
        },
        {
            label: 'JUMP',
            keys: [
                'W',
                'SPACE'
            ]
        },
        {
            label: 'TELEPORT',
            keys: [
                'SHIFT + DIR'
            ]
        },
        {
            label: 'RESTART',
            keys: [
                'R'
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-6 py-3",
        children: keys.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-muted-foreground",
                        children: group.label
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/controls-help.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1",
                        children: group.keys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                className: "rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground",
                                children: k
                            }, k, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/controls-help.tsx",
                                lineNumber: 18,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/controls-help.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                ]
            }, group.label, true, {
                fileName: "[project]/2-d-platformer-game/components/game/controls-help.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/controls-help.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = ControlsHelp;
var _c;
__turbopack_context__.k.register(_c, "ControlsHelp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/game-session.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameSession",
    ()=>GameSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$use$2d$game$2d$loop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/use-game-loop.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$game$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/game-canvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$game$2d$hud$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/game-hud.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$controls$2d$help$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/controls-help.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function GameSession({ level, levelIndex, onBack }) {
    _s();
    const { playerPos, shadowPos, isGlitching, isTeleporting, isWindingUp, runNumber, frameCount, teleportTrails, reachedFlag, showFlagMessage, tutorialStep, restart, hasLost, showLoseMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$use$2d$game$2d$loop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameLoop"])(level);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-x border-t border-border bg-card px-4 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-mono text-sm font-bold tracking-widest text-neon-purple",
                                style: {
                                    textShadow: '0 0 12px rgba(168, 85, 247, 0.4)'
                                },
                                children: "CHRONOSHIFT"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-muted-foreground",
                                        children: [
                                            'LVL ',
                                            String(levelIndex + 1).padStart(2, '0'),
                                            ' // ',
                                            level.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 w-1.5 rounded-full bg-neon-green animate-neon-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$game$2d$hud$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameHUD"], {
                        runNumber: runNumber,
                        frameCount: frameCount,
                        hasShadow: shadowPos !== null,
                        reachedFlag: reachedFlag,
                        onRestart: restart,
                        onBack: onBack,
                        hasLost: hasLost
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$game$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameCanvas"], {
                level: level,
                playerPos: playerPos,
                shadowPos: shadowPos,
                isGlitching: isGlitching,
                isTeleporting: isTeleporting,
                isWindingUp: isWindingUp,
                teleportTrails: teleportTrails,
                reachedFlag: reachedFlag,
                showFlagMessage: showFlagMessage,
                tutorialStep: tutorialStep,
                hasLost: hasLost,
                showLoseMessage: showLoseMessage
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"]
                },
                className: "border-x border-b border-border bg-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$controls$2d$help$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlsHelp"], {}, void 0, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/game-session.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(GameSession, "M4NjsPXJ61O3smzzX2IGW4aNJL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$use$2d$game$2d$loop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameLoop"]
    ];
});
_c = GameSession;
var _c;
__turbopack_context__.k.register(_c, "GameSession");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/level-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LevelEditor",
    ()=>LevelEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const GRID_SIZE = 20;
const TOOL_SIZE = 80;
const WALL_HEIGHT = 100;
function LevelEditor({ onSave, onBack }) {
    _s();
    const [levelName, setLevelName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('CUSTOM LEVEL');
    const [levelSubtitle, setLevelSubtitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Made by player');
    const [selectedTool, setSelectedTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [editorState, setEditorState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        platforms: [],
        walls: [],
        playerStart: {
            x: 100,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"] - 60
        },
        playerStart2: {
            x: 800,
            y: 100
        },
        flag: {
            x: 450,
            y: 100
        }
    });
    const snapToGrid = (val)=>Math.round(val / GRID_SIZE) * GRID_SIZE;
    const handleCanvasMouseDown = (e)=>{
        if (!selectedTool || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"], snapToGrid(e.clientX - rect.left)));
        const y = Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"], snapToGrid(e.clientY - rect.top)));
        if (selectedTool === 'platform' || selectedTool === 'wall') {
            setIsDragging(true);
            setDragStart({
                x,
                y
            });
        } else if (selectedTool === 'spawn1') {
            setEditorState((prev)=>({
                    ...prev,
                    playerStart: {
                        x,
                        y
                    }
                }));
        } else if (selectedTool === 'spawn2') {
            setEditorState((prev)=>({
                    ...prev,
                    playerStart2: {
                        x,
                        y
                    }
                }));
        } else if (selectedTool === 'flag') {
            setEditorState((prev)=>({
                    ...prev,
                    flag: {
                        x,
                        y
                    }
                }));
        }
    };
    const handleCanvasMouseMove = (e)=>{
        if (!isDragging || !selectedTool || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"], snapToGrid(e.clientX - rect.left)));
        const y = Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"], snapToGrid(e.clientY - rect.top)));
    // Show preview while dragging (visual feedback)
    };
    const handleCanvasMouseUp = (e)=>{
        if (!isDragging || !selectedTool || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"], snapToGrid(e.clientX - rect.left)));
        const y = Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"], snapToGrid(e.clientY - rect.top)));
        const width = Math.max(GRID_SIZE, Math.abs(x - dragStart.x));
        const height = Math.max(GRID_SIZE, Math.abs(y - dragStart.y));
        const startX = Math.min(dragStart.x, x);
        const startY = Math.min(dragStart.y, y);
        if (selectedTool === 'platform') {
            setEditorState((prev)=>({
                    ...prev,
                    platforms: [
                        ...prev.platforms,
                        {
                            x: startX,
                            y: startY,
                            w: width,
                            h: height
                        }
                    ]
                }));
        } else if (selectedTool === 'wall') {
            setEditorState((prev)=>({
                    ...prev,
                    walls: [
                        ...prev.walls,
                        {
                            x: startX,
                            y: startY,
                            w: width,
                            h: height,
                            isThin: height < WALL_HEIGHT
                        }
                    ]
                }));
        }
        setIsDragging(false);
    };
    const handleSave = ()=>{
        const level = {
            name: levelName,
            subtitle: levelSubtitle,
            platforms: editorState.platforms,
            walls: editorState.walls,
            playerStart: editorState.playerStart,
            playerStart2: editorState.playerStart2,
            flag: editorState.flag
        };
        onSave(level);
    };
    const handleClear = ()=>{
        setEditorState({
            platforms: [],
            walls: [],
            playerStart: {
                x: 100,
                y: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"] - 60
            },
            playerStart2: {
                x: 800,
                y: 100
            },
            flag: {
                x: 450,
                y: 100
            }
        });
    };
    const deletePlatform = (idx)=>{
        setEditorState((prev)=>({
                ...prev,
                platforms: prev.platforms.filter((_, i)=>i !== idx)
            }));
    };
    const deleteWall = (idx)=>{
        setEditorState((prev)=>({
                ...prev,
                walls: prev.walls.filter((_, i)=>i !== idx)
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-4 max-w-6xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: levelName,
                                onChange: (e)=>setLevelName(e.target.value),
                                className: "border px-3 py-2 font-mono text-sm bg-card",
                                placeholder: "Level Name",
                                maxLength: 30
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: levelSubtitle,
                                onChange: (e)=>setLevelSubtitle(e.target.value),
                                className: "border px-3 py-2 font-mono text-sm bg-card",
                                placeholder: "Subtitle",
                                maxLength: 30
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onBack,
                                className: "border border-border bg-secondary px-4 py-2 font-mono text-sm transition-all hover:border-foreground/30",
                                children: "BACK"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                className: "border px-4 py-2 font-mono text-sm transition-all",
                                style: {
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '33',
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '11',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                },
                                children: "SAVE LEVEL"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: canvasRef,
                        onMouseDown: handleCanvasMouseDown,
                        onMouseMove: handleCanvasMouseMove,
                        onMouseUp: handleCanvasMouseUp,
                        onMouseLeave: ()=>setIsDragging(false),
                        className: "relative border border-border bg-black cursor-crosshair select-none",
                        style: {
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_WIDTH"],
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_HEIGHT"],
                            backgroundImage: `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}11 1px, transparent 1px), linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]}11 1px, transparent 1px)`,
                            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
                        },
                        children: [
                            editorState.platforms.map((plat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        deletePlatform(idx);
                                    },
                                    className: "absolute border border-neon-green bg-neon-green/10 cursor-pointer hover:opacity-70 transition-opacity",
                                    style: {
                                        left: plat.x,
                                        top: plat.y,
                                        width: plat.w,
                                        height: plat.h,
                                        boxShadow: `inset 0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]}44`
                                    },
                                    title: "Click to delete"
                                }, `plat-${idx}`, false, {
                                    fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this)),
                            editorState.walls.map((wall, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        deleteWall(idx);
                                    },
                                    className: "absolute border border-neon-blue bg-neon-blue/20 cursor-pointer hover:opacity-70 transition-opacity",
                                    style: {
                                        left: wall.x,
                                        top: wall.y,
                                        width: wall.w,
                                        height: wall.h,
                                        boxShadow: `inset 0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]}44`
                                    },
                                    title: "Click to delete"
                                }, `wall-${idx}`, false, {
                                    fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedTool('spawn1'),
                                className: "absolute w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform",
                                style: {
                                    left: editorState.playerStart.x,
                                    top: editorState.playerStart.y,
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '22'
                                },
                                title: "Spawn 1 (Run 1)"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedTool('spawn2'),
                                className: "absolute w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform",
                                style: {
                                    left: editorState.playerStart2.x,
                                    top: editorState.playerStart2.y,
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"],
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"] + '22'
                                },
                                title: "Spawn 2 (Run 2)"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedTool('flag'),
                                className: "absolute cursor-pointer hover:scale-110 transition-transform",
                                style: {
                                    left: editorState.flag.x,
                                    top: editorState.flag.y
                                },
                                title: "Goal Flag",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 2,
                                            height: 28,
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            left: 4,
                                            top: 1,
                                            width: 12,
                                            height: 10,
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"],
                                            clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            isDragging && selectedTool && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute border-2 border-dashed",
                                style: {
                                    left: Math.min(dragStart.x, dragStart.x),
                                    top: Math.min(dragStart.y, dragStart.y),
                                    width: Math.abs(dragStart.x - dragStart.x) || 0,
                                    height: Math.abs(dragStart.y - dragStart.y) || 0,
                                    borderColor: selectedTool === 'platform' ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] : __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"],
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-mono text-muted-foreground mb-2",
                                children: "TOOLS"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedTool(selectedTool === 'platform' ? null : 'platform'),
                                className: `px-4 py-2 font-mono text-xs border transition-all ${selectedTool === 'platform' ? 'opacity-100' : 'opacity-60'}`,
                                style: {
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '44',
                                    background: selectedTool === 'platform' ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '22' : 'transparent',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                },
                                children: "PLATFORM"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedTool(selectedTool === 'wall' ? null : 'wall'),
                                className: `px-4 py-2 font-mono text-xs border transition-all ${selectedTool === 'wall' ? 'opacity-100' : 'opacity-60'}`,
                                style: {
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"] + '44',
                                    background: selectedTool === 'wall' ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"] + '22' : 'transparent',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_BLUE"]
                                },
                                children: "WALL"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedTool(selectedTool === 'spawn1' ? null : 'spawn1'),
                                className: `px-4 py-2 font-mono text-xs border transition-all ${selectedTool === 'spawn1' ? 'opacity-100' : 'opacity-60'}`,
                                style: {
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '44',
                                    background: selectedTool === 'spawn1' ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '22' : 'transparent',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                },
                                children: "SPAWN 1"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedTool(selectedTool === 'spawn2' ? null : 'spawn2'),
                                className: `px-4 py-2 font-mono text-xs border transition-all ${selectedTool === 'spawn2' ? 'opacity-100' : 'opacity-60'}`,
                                style: {
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"] + '44',
                                    background: selectedTool === 'spawn2' ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"] + '22' : 'transparent',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PURPLE"]
                                },
                                children: "SPAWN 2"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedTool(selectedTool === 'flag' ? null : 'flag'),
                                className: `px-4 py-2 font-mono text-xs border transition-all ${selectedTool === 'flag' ? 'opacity-100' : 'opacity-60'}`,
                                style: {
                                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '44',
                                    background: selectedTool === 'flag' ? __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"] + '22' : 'transparent',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_GREEN"]
                                },
                                children: "FLAG"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                className: "my-2 border-border"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClear,
                                className: "px-4 py-2 font-mono text-xs border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all",
                                children: "CLEAR ALL"
                            }, void 0, false, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-muted-foreground mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Platform: drag to create"
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Wall: drag to create"
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Spawn/Flag: click to place"
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Click element to delete"
                                    }, void 0, false, {
                                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                        lineNumber: 389,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/2-d-platformer-game/components/game/level-editor.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(LevelEditor, "OKl4eaGOzfhZXB11NATNJ1n7y+I=");
_c = LevelEditor;
var _c;
__turbopack_context__.k.register(_c, "LevelEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/2-d-platformer-game/components/game/platformer-game.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlatformerGame",
    ()=>PlatformerGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"); //
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/node_modules/.pnpm/framer-motion@11.18.2_react_cad63855b5ed6b038434798e5e606909/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$title$2d$screen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/title-screen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$level$2d$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/level-select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$game$2d$session$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/game-session.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$level$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/components/game/level-editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/2-d-platformer-game/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function PlatformerGame() {
    _s();
    const [screen, setScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('title');
    const [levelIndex, setLevelIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [customLevel, setCustomLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlayingCustom, setIsPlayingCustom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 1. Create a reference to hold the audio object
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 2. Initialize the audio settings when the component first loads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlatformerGame.useEffect": ()=>{
            if (!audioRef.current) {
                // Ensure your file is in the 'public' folder and named exactly 'bg-music.mp3'
                audioRef.current = new Audio('/bg-music.mp3');
                audioRef.current.loop = true;
                audioRef.current.volume = 0.3; // Set a comfortable background volume
            }
        }
    }["PlatformerGame.useEffect"], []);
    // 3. Create a function to start music on the first user interaction
    const startMusicAndProceed = ()=>{
        audioRef.current?.play().catch((err)=>{
            console.warn("Audio play blocked or failed:", err);
        });
        setScreen('levels');
    };
    const handleSaveCustomLevel = async (level)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCustomLevel"])({
                name: level.name,
                subtitle: level.subtitle,
                platforms: level.platforms,
                walls: level.walls,
                playerStart: level.playerStart,
                playerStart2: level.playerStart2,
                flag: level.flag
            });
            setCustomLevel(level);
            setIsPlayingCustom(true);
            setScreen('game');
        } catch (error) {
            console.error('Failed to save level:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            children: [
                screen === 'title' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$title$2d$screen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TitleScreen"], {
                        onStart: startMusicAndProceed
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                        lineNumber: 72,
                        columnNumber: 13
                    }, this)
                }, "title", false, {
                    fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this),
                screen === 'levels' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$level$2d$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LevelSelect"], {
                        onSelect: (idx)=>{
                            setLevelIndex(idx);
                            setIsPlayingCustom(false);
                            setScreen('game');
                        },
                        onBack: ()=>setScreen('title'),
                        onEditLevel: ()=>setScreen('editor'),
                        onSelectCustomLevel: (level)=>{
                            setCustomLevel(level);
                            setIsPlayingCustom(true);
                            setScreen('game');
                        }
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this)
                }, "levels", false, {
                    fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this),
                screen === 'editor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$level$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LevelEditor"], {
                        onSave: handleSaveCustomLevel,
                        onBack: ()=>setScreen('levels')
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this)
                }, "editor", false, {
                    fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this),
                screen === 'game' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$18$2e$2_react_cad63855b5ed6b038434798e5e606909$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$game$2d$session$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameSession"], {
                        level: isPlayingCustom && customLevel ? customLevel : __TURBOPACK__imported__module__$5b$project$5d2f$2$2d$d$2d$platformer$2d$game$2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEVELS"][levelIndex],
                        levelIndex: isPlayingCustom ? -1 : levelIndex,
                        onBack: ()=>setScreen('levels')
                    }, void 0, false, {
                        fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, this)
                }, `game-${isPlayingCustom ? 'custom' : levelIndex}`, false, {
                    fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/2-d-platformer-game/components/game/platformer-game.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(PlatformerGame, "/i4yj+SozC2qvI+cL3HACeWa1bA=");
_c = PlatformerGame;
var _c;
__turbopack_context__.k.register(_c, "PlatformerGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=2-d-platformer-game_741e6b4f._.js.map