import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Download, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Eye, 
  FileCode2, 
  Crosshair, 
  Cpu, 
  Maximize2
} from 'lucide-react';

interface CadEntity {
  id: string;
  name: string;
  type: 'CIRCLE' | 'POLYLINE' | 'DIMENSION' | 'SYMBOL' | 'ANNOTATION';
  layer: 'geometry' | 'dimensions' | 'annotations' | 'symbols';
  coords: string;
  details: Record<string, string>;
  category: string;
  confidence?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const CadSimulator: React.FC = () => {
  const [activeBlueprint, setActiveBlueprint] = useState<'mechanical' | 'pid' | 'structural'>('mechanical');
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    geometry: true,
    dimensions: true,
    annotations: true,
    symbols: true,
    boundingBoxes: true,
  });
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>('flange-bore');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState<number>(100);
  const [statusMessage, setStatusMessage] = useState<string>('Ready for geometric extraction');
  const [filterText, setFilterText] = useState('');

  const toggleLayer = (layerKey: string) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Blueprint 1: Mechanical Flange Assembly
  const mechanicalEntities: CadEntity[] = [
    {
      id: 'flange-outer',
      name: 'Outer Flange Rim',
      type: 'CIRCLE',
      layer: 'geometry',
      coords: 'Center: (320, 240), R: 160mm',
      category: 'Machining Boundary',
      confidence: '99.8%',
      details: {
        'DWG Handle': '0x1F4A',
        'Entity Type': 'AcDbCircle',
        'Nominal Diameter': 'Ø 320.00 mm',
        'Tolerance Class': 'ISO 2768-m',
        'Concentricity': '0.02 mm A-B',
        'Surface Finish': 'Ra 3.2 µm'
      },
      x: 160, y: 80, w: 320, h: 320
    },
    {
      id: 'flange-bore',
      name: 'Precision Center Bore',
      type: 'CIRCLE',
      layer: 'geometry',
      coords: 'Center: (320, 240), R: 55mm',
      category: 'Critical Fit Feature',
      confidence: '99.9%',
      details: {
        'DWG Handle': '0x1F4B',
        'Entity Type': 'AcDbCircle',
        'Nominal Diameter': 'Ø 110.00 mm',
        'Tolerance': '+0.035 / -0.000 mm (H7)',
        'Keyway Slot': 'DIN 6885 (12x8mm)',
        'Classification': 'Mating Shaft Interface'
      },
      x: 265, y: 185, w: 110, h: 110
    },
    {
      id: 'pcd-pattern',
      name: 'Pitch Circle Bolt Pattern (8x M16)',
      type: 'SYMBOL',
      layer: 'symbols',
      coords: 'PCD: 240mm, N=8 @ 45°',
      category: 'Fastener Pattern',
      confidence: '99.4%',
      details: {
        'DWG Handle': '0x1F4C',
        'Entity Type': 'AcDbBlockReference',
        'Hole Count': '8 Equispaced',
        'Hole Diameter': 'Ø 18.00 mm (Thru)',
        'Pitch Circle': 'Ø 240.00 mm',
        'Pattern Classification': 'Standard Flange EN 1092-1'
      },
      x: 190, y: 110, w: 260, h: 260
    },
    {
      id: 'dim-outer',
      name: 'Outer Diameter Dimension',
      type: 'DIMENSION',
      layer: 'dimensions',
      coords: 'Dim Line: X=530, Y=80 to Y=400',
      category: 'Linear Dimension',
      confidence: '98.9%',
      details: {
        'DWG Handle': '0x1F52',
        'Entity Type': 'AcDbAlignedDimension',
        'Measurement': '320.00 mm',
        'Tolerance Text': '±0.25',
        'Arrow Style': 'Closed Filled 3.5mm',
        'Associated Geom': '0x1F4A'
      },
      x: 480, y: 80, w: 70, h: 320
    },
    {
      id: 'gdt-callout',
      name: 'GD&T Position Tolerance',
      type: 'ANNOTATION',
      layer: 'annotations',
      coords: 'Leader: (410, 160) -> Box',
      category: 'Geometric Tolerance',
      confidence: '99.1%',
      details: {
        'DWG Handle': '0x1F60',
        'Entity Type': 'AcDbFcf (Feature Control)',
        'Characteristic': 'True Position Ø 0.15 [M] A B C',
        'Datum References': 'Datum A, Datum B',
        'Extraction Target': 'Quality Inspection Sheet'
      },
      x: 390, y: 120, w: 130, h: 50
    },
    {
      id: 'chamfer-callout',
      name: 'Bore Lead-in Chamfer',
      type: 'ANNOTATION',
      layer: 'annotations',
      coords: 'Leader: (275, 230)',
      category: 'Feature Note',
      confidence: '97.8%',
      details: {
        'DWG Handle': '0x1F65',
        'Entity Type': 'AcDbLeader',
        'Note Text': 'CHAMFER 2.0 x 45° TYP',
        'Target Surface': 'Inner Bore Edge',
        'Classification': 'Deburr Requirement'
      },
      x: 190, y: 220, w: 90, h: 40
    }
  ];

  // Blueprint 2: P&ID Piping & Instrumentation
  const pidEntities: CadEntity[] = [
    {
      id: 'pid-valve-1',
      name: 'Pneumatic Control Valve CV-102',
      type: 'SYMBOL',
      layer: 'symbols',
      coords: 'Node: (300, 240), Size: 40x30',
      category: 'P&ID Valve Symbol',
      confidence: '99.7%',
      details: {
        'DWG Handle': '0x3A01',
        'Symbol Class': 'Control Valve (Diaphragm Actuator)',
        'Tag Number': 'CV-102',
        'Line Size': '4 inch Schedule 40',
        'Fail State': 'Fail Closed (FC)',
        'Instrument Loop': 'Flow Control Loop 100'
      },
      x: 275, y: 215, w: 50, h: 50
    },
    {
      id: 'pid-line',
      name: 'Process Flow Header (6"-P-101-CS)',
      type: 'POLYLINE',
      layer: 'geometry',
      coords: 'Points: (80, 240) -> (540, 240)',
      category: 'Piping Route',
      confidence: '99.5%',
      details: {
        'DWG Handle': '0x3A05',
        'Entity Type': 'AcDbPolyline',
        'Length': '460 mm (Drawing Units)',
        'Pipe Spec': 'Carbon Steel A106 Gr. B',
        'Fluid Medium': 'Process Cooling Water',
        'Flow Direction': 'West to East (->)'
      },
      x: 80, y: 235, w: 460, h: 10
    },
    {
      id: 'pid-flow-meter',
      name: 'Orifice Flow Meter FE-102',
      type: 'SYMBOL',
      layer: 'symbols',
      coords: 'Node: (190, 240)',
      category: 'Primary Instrument Element',
      confidence: '99.2%',
      details: {
        'DWG Handle': '0x3A12',
        'Symbol Class': 'Orifice Plate Assembly',
        'Tag Number': 'FE-102',
        'Signal Type': 'Differential Pressure 4-20mA',
        'Extraction Status': 'Mapped to Instrument Index'
      },
      x: 170, y: 220, w: 40, h: 40
    },
    {
      id: 'pid-transmitter-bubble',
      name: 'Flow Transmitter Bubble (FT-102)',
      type: 'ANNOTATION',
      layer: 'annotations',
      coords: 'Center: (190, 140), R: 25mm',
      category: 'Instrumentation Bubble',
      confidence: '99.8%',
      details: {
        'DWG Handle': '0x3A20',
        'Entity Type': 'ISA 5.1 Instrument Circle',
        'Identifier': 'FT-102',
        'Location': 'Field Mounted (No Horizontal Bar)',
        'Signal Connection': 'Electrical Signal (Dashed Line)'
      },
      x: 165, y: 115, w: 50, h: 50
    }
  ];

  // Blueprint 3: Structural Joint
  const structuralEntities: CadEntity[] = [
    {
      id: 'beam-flange',
      name: 'Wide Flange Section W12x50',
      type: 'POLYLINE',
      layer: 'geometry',
      coords: 'Extents: 380x180 mm',
      category: 'Structural Profile',
      confidence: '99.6%',
      details: {
        'DWG Handle': '0x8C10',
        'Section Type': 'ASTM A992 Wide Flange',
        'Depth': '310 mm (12.2 in)',
        'Flange Width': '205 mm',
        'Web Thickness': '9.4 mm',
        'Classification': 'Primary Girder'
      },
      x: 120, y: 150, w: 380, h: 180
    },
    {
      id: 'gusset-plate',
      name: 'Splice Gusset Plate 16mm',
      type: 'POLYLINE',
      layer: 'geometry',
      coords: 'Points: 4 Vertex Contour',
      category: 'Connection Element',
      confidence: '99.2%',
      details: {
        'DWG Handle': '0x8C14',
        'Material Spec': 'ASTM A36 Steel',
        'Thickness': '16.0 mm Plate',
        'Weld Prep': 'Bevel Edge 45°',
        'Classification': 'Moment Splice Plate'
      },
      x: 230, y: 130, w: 160, h: 220
    },
    {
      id: 'weld-symbol',
      name: 'Fillet Weld All-Around Symbol',
      type: 'SYMBOL',
      layer: 'symbols',
      coords: 'Anchor: (390, 160)',
      category: 'AWS Welding Callout',
      confidence: '98.7%',
      details: {
        'DWG Handle': '0x8C32',
        'Weld Type': 'Double Fillet 8mm Leg (6mm Throat)',
        'Standard': 'AWS A2.4 Welding Symbols',
        'Flag': 'Field Weld Icon Detected',
        'Contour': 'Flush Ground'
      },
      x: 375, y: 140, w: 60, h: 40
    },
    {
      id: 'bolt-pitch',
      name: 'Bolt Pitch Centerline Dimension',
      type: 'DIMENSION',
      layer: 'dimensions',
      coords: 'Spacing: 75mm Equal Pitch',
      category: 'Fastener Layout Dimension',
      confidence: '99.0%',
      details: {
        'DWG Handle': '0x8C44',
        'Dimension Type': 'Continuous Chain Dimension',
        'Bolt Specification': '3/4" A325 High Strength Bolts',
        'Edge Distance': '40 mm Min',
        'Classification': 'Fabrication Spacing'
      },
      x: 260, y: 180, w: 100, h: 120
    }
  ];

  const currentEntities = activeBlueprint === 'mechanical' 
    ? mechanicalEntities 
    : activeBlueprint === 'pid' 
      ? pidEntities 
      : structuralEntities;

  const selectedEntity = currentEntities.find(e => e.id === selectedEntityId) || currentEntities[0];

  const filteredEntities = currentEntities.filter(e => 
    e.name.toLowerCase().includes(filterText.toLowerCase()) ||
    e.category.toLowerCase().includes(filterText.toLowerCase()) ||
    e.type.toLowerCase().includes(filterText.toLowerCase())
  );

  const runExtractionPipeline = () => {
    setIsProcessing(true);
    setPipelineProgress(0);
    setStatusMessage('Reading VectorDraw DWG entity tree...');

    setTimeout(() => {
      setPipelineProgress(30);
      setStatusMessage('Decomposing vector primitives & spatial R-Tree indexing...');
    }, 400);

    setTimeout(() => {
      setPipelineProgress(65);
      setStatusMessage('Classifying dimensions, GD&T callouts & leader vectors...');
    }, 900);

    setTimeout(() => {
      setPipelineProgress(90);
      setStatusMessage('Pattern matching geometric symbols against engineering catalog...');
    }, 1400);

    setTimeout(() => {
      setPipelineProgress(100);
      setIsProcessing(false);
      setStatusMessage('Extraction complete! Structured data generated.');
    }, 1900);
  };

  const handleExportCSV = () => {
    const headers = ['Entity ID', 'Name', 'Type', 'Category', 'Layer', 'Coordinates', 'Confidence'];
    const rows = currentEntities.map(e => [
      e.id,
      `"${e.name}"`,
      e.type,
      `"${e.category}"`,
      e.layer,
      `"${e.coords}"`,
      e.confidence || '99.0%'
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `magendran_cad_extraction_${activeBlueprint}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="cad-simulator" className="py-20 bg-slate-900 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#35C2F8] text-xs font-mono uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Production Engineering Tool · Coherent Automation</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wider">
              CAD DATA EXTRACTION & GEOMETRIC DETECTION
            </h2>
            <span className="cyan-divider-left" />
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Interactive demonstration of C# & .NET routines with VectorDraw: inspect DWG vector primitives, 
              detect symbols, classify geometric tolerances, and export structured engineering outputs.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={runExtractionPipeline}
              disabled={isProcessing}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider rounded transition-all ${
                isProcessing 
                  ? 'bg-sky-950 text-sky-200 cursor-not-allowed'
                  : 'bg-[#35C2F8] hover:bg-[#20a9df] text-white shadow-lg shadow-[#35C2F8]/20 active:scale-95'
              }`}
            >
              {isProcessing ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-white" />
              )}
              {isProcessing ? 'Processing DWG Stream...' : 'Run Extraction Pipeline'}
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Download Extracted Structured Engineering CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Blueprint Selector & Viewport Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-mono mr-2">Sample DWG:</span>
            <button
              onClick={() => { setActiveBlueprint('mechanical'); setSelectedEntityId('flange-bore'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeBlueprint === 'mechanical'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Mechanical Flange Assembly
            </button>
            <button
              onClick={() => { setActiveBlueprint('pid'); setSelectedEntityId('pid-valve-1'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeBlueprint === 'pid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              P&ID Piping Flow Loop
            </button>
            <button
              onClick={() => { setActiveBlueprint('structural'); setSelectedEntityId('beam-flange'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeBlueprint === 'structural'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Structural Joint & Weld
            </button>
          </div>

          {/* Layer Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-slate-400 font-mono mr-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Layers:</span>
            </div>
            {[
              { id: 'geometry', label: 'Geometry', color: 'border-cyan-500/50 text-cyan-400' },
              { id: 'dimensions', label: 'Dimensions', color: 'border-emerald-500/50 text-emerald-400' },
              { id: 'annotations', label: 'Annotations', color: 'border-amber-500/50 text-amber-400' },
              { id: 'symbols', label: 'Symbols', color: 'border-purple-500/50 text-purple-400' },
              { id: 'boundingBoxes', label: 'Bounding Boxes', color: 'border-rose-500/50 text-rose-400' },
            ].map(layer => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                  activeLayers[layer.id]
                    ? `bg-slate-800 ${layer.color}`
                    : 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeLayers[layer.id] ? 'bg-current' : 'bg-slate-600'}`} />
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status & Progress Bar when extraction runs */}
        {isProcessing && (
          <div className="mb-4 bg-indigo-950/60 border border-indigo-800/80 p-3 rounded-lg text-xs font-mono">
            <div className="flex items-center justify-between text-indigo-300 mb-1.5">
              <span className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                {statusMessage}
              </span>
              <span>{pipelineProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-500 h-1.5 transition-all duration-300"
                style={{ width: `${pipelineProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Grid: CAD Canvas + Structured Data Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CAD Interactive Blueprint Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col">
            
            {/* Viewport Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-slate-200">DWG Viewport: VectorDraw Canvas 2.4</span>
                <span className="text-slate-600">|</span>
                <span>Scale: 1:1 [Metric mm]</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-slate-500">Click entities to inspect</span>
                <Crosshair className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* SVG Drawing Canvas with Blueprint Grid */}
            <div className="relative flex-1 min-h-[440px] cad-grid-dark flex items-center justify-center p-4 overflow-hidden select-none">
              
              {/* Scanline laser during processing */}
              {isProcessing && (
                <div 
                  className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 z-30 pointer-events-none shadow-[0_0_15px_#38bdf8]"
                  style={{
                    left: `${pipelineProgress}%`,
                    transition: 'left 300ms linear'
                  }}
                />
              )}

              <svg 
                viewBox="0 0 640 480" 
                className="w-full h-full max-h-[460px] drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              >
                <defs>
                  {/* Blueprint Grid Lines Pattern */}
                  <pattern id="cad-fine-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
                  </pattern>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                  <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f59e0b" />
                  </marker>
                </defs>

                <rect width="640" height="480" fill="transparent" />
                <rect width="640" height="480" fill="url(#cad-fine-grid)" />

                {/* DRAWING 1: MECHANICAL FLANGE */}
                {activeBlueprint === 'mechanical' && (
                  <g id="mechanical-drawing">
                    {/* Centerlines (Dashed) */}
                    <line x1="120" y1="240" x2="520" y2="240" stroke="#475569" strokeDasharray="8 4 2 4" strokeWidth="1" />
                    <line x1="320" y1="40" x2="320" y2="440" stroke="#475569" strokeDasharray="8 4 2 4" strokeWidth="1" />

                    {/* Geometry: Outer Flange Circle */}
                    {activeLayers.geometry && (
                      <circle
                        cx="320"
                        cy="240"
                        r="160"
                        fill="none"
                        stroke={selectedEntityId === 'flange-outer' ? '#38bdf8' : '#06b6d4'}
                        strokeWidth={selectedEntityId === 'flange-outer' ? '3' : '2'}
                        className="cursor-pointer hover:stroke-cyan-300 transition-colors"
                        onClick={() => setSelectedEntityId('flange-outer')}
                      />
                    )}

                    {/* Geometry: Center Bore Circle */}
                    {activeLayers.geometry && (
                      <circle
                        cx="320"
                        cy="240"
                        r="55"
                        fill="rgba(6, 182, 212, 0.05)"
                        stroke={selectedEntityId === 'flange-bore' ? '#38bdf8' : '#06b6d4'}
                        strokeWidth={selectedEntityId === 'flange-bore' ? '3' : '2'}
                        className="cursor-pointer hover:stroke-cyan-300 transition-colors"
                        onClick={() => setSelectedEntityId('flange-bore')}
                      />
                    )}

                    {/* Symbols: Bolt PCD Circle & 8 Holes */}
                    {activeLayers.symbols && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('pcd-pattern')}
                      >
                        {/* PCD dashed path */}
                        <circle
                          cx="320"
                          cy="240"
                          r="120"
                          fill="none"
                          stroke={selectedEntityId === 'pcd-pattern' ? '#c084fc' : '#a855f7'}
                          strokeWidth="1.5"
                          strokeDasharray="6 4"
                        />
                        {/* 8 Bolt Holes */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                          const rad = (angle * Math.PI) / 180;
                          const bx = 320 + 120 * Math.cos(rad);
                          const by = 240 + 120 * Math.sin(rad);
                          return (
                            <g key={idx}>
                              <circle
                                cx={bx}
                                cy={by}
                                r="9"
                                fill="rgba(168, 85, 247, 0.15)"
                                stroke={selectedEntityId === 'pcd-pattern' ? '#d8b4fe' : '#a855f7'}
                                strokeWidth="2"
                              />
                              <line x1={bx - 12} y1={by} x2={bx + 12} y2={by} stroke="#a855f7" strokeWidth="0.75" />
                              <line x1={bx} y1={by - 12} x2={bx} y2={by + 12} stroke="#a855f7" strokeWidth="0.75" />
                            </g>
                          );
                        })}
                      </g>
                    )}

                    {/* Dimensions: Outer Diameter Leader */}
                    {activeLayers.dimensions && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('dim-outer')}
                      >
                        <line x1="480" y1="80" x2="520" y2="80" stroke="#10b981" strokeWidth="1" />
                        <line x1="480" y1="400" x2="520" y2="400" stroke="#10b981" strokeWidth="1" />
                        <line x1="510" y1="80" x2="510" y2="400" stroke="#10b981" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                        <text x="525" y="245" fill="#34d399" fontSize="12" fontFamily="Geist Mono" transform="rotate(90, 525, 245)">
                          Ø 320.00 ±0.25
                        </text>
                      </g>
                    )}

                    {/* Annotations: GD&T Feature Box */}
                    {activeLayers.annotations && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('gdt-callout')}
                      >
                        <line x1="405" y1="155" x2="440" y2="135" stroke="#f59e0b" strokeWidth="1" />
                        <line x1="440" y1="135" x2="500" y2="135" stroke="#f59e0b" strokeWidth="1" />
                        <rect x="500" y="120" width="125" height="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="530" y1="120" x2="530" y2="148" stroke="#f59e0b" strokeWidth="1" />
                        <line x1="585" y1="120" x2="585" y2="148" stroke="#f59e0b" strokeWidth="1" />
                        <text x="515" y="138" fill="#fbbf24" fontSize="11" fontFamily="Geist Mono" textAnchor="middle">⊕</text>
                        <text x="557" y="138" fill="#fbbf24" fontSize="10" fontFamily="Geist Mono" textAnchor="middle">Ø 0.15 Ⓜ</text>
                        <text x="605" y="138" fill="#fbbf24" fontSize="10" fontFamily="Geist Mono" textAnchor="middle">A | B</text>
                      </g>
                    )}

                    {/* Annotations: Chamfer Note */}
                    {activeLayers.annotations && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('chamfer-callout')}
                      >
                        <line x1="275" y1="230" x2="220" y2="200" stroke="#f59e0b" strokeWidth="1" markerStart="url(#arrow-amber)" />
                        <line x1="220" y1="200" x2="130" y2="200" stroke="#f59e0b" strokeWidth="1" />
                        <text x="130" y="195" fill="#fbbf24" fontSize="10" fontFamily="Geist Mono">
                          CHAMFER 2.0 x 45°
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* DRAWING 2: P&ID FLOW LOOP */}
                {activeBlueprint === 'pid' && (
                  <g id="pid-drawing">
                    {/* Process Main Line */}
                    {activeLayers.geometry && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('pid-line')}
                      >
                        <line x1="80" y1="240" x2="560" y2="240" stroke="#06b6d4" strokeWidth="3" />
                        {/* Flow Arrows */}
                        <path d="M 120 236 L 130 240 L 120 244 z" fill="#06b6d4" />
                        <path d="M 460 236 L 470 240 L 460 244 z" fill="#06b6d4" />
                        <text x="90" y="225" fill="#38bdf8" fontSize="10" fontFamily="Geist Mono">
                          6"-P-101-CS (CW SUPPLY)
                        </text>
                      </g>
                    )}

                    {/* Symbol: Control Valve */}
                    {activeLayers.symbols && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('pid-valve-1')}
                      >
                        {/* Valve triangles */}
                        <path d="M 280 225 L 320 255 L 320 225 L 280 255 z" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
                        {/* Actuator Stem & Diaphragm Top */}
                        <line x1="300" y1="240" x2="300" y2="195" stroke="#a855f7" strokeWidth="1.5" />
                        <path d="M 285 195 C 285 180, 315 180, 315 195 z" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="1.5" />
                        <line x1="280" y1="195" x2="320" y2="195" stroke="#a855f7" strokeWidth="1.5" />
                        <text x="300" y="170" fill="#d8b4fe" fontSize="11" fontFamily="Geist Mono" textAnchor="middle">
                          CV-102
                        </text>
                      </g>
                    )}

                    {/* Symbol: Orifice Plate */}
                    {activeLayers.symbols && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('pid-flow-meter')}
                      >
                        <line x1="185" y1="225" x2="185" y2="255" stroke="#a855f7" strokeWidth="3" />
                        <line x1="195" y1="225" x2="195" y2="255" stroke="#a855f7" strokeWidth="3" />
                        <circle cx="190" cy="240" r="14" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="190" y1="225" x2="190" y2="165" stroke="#64748b" strokeDasharray="4 3" strokeWidth="1.2" />
                      </g>
                    )}

                    {/* Annotation: FT-102 Instrument Bubble */}
                    {activeLayers.annotations && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('pid-transmitter-bubble')}
                      >
                        <circle cx="190" cy="140" r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="190" y="136" fill="#fbbf24" fontSize="9" fontFamily="Geist Mono" textAnchor="middle">
                          FT
                        </text>
                        <text x="190" y="149" fill="#fbbf24" fontSize="9" fontFamily="Geist Mono" textAnchor="middle">
                          102
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* DRAWING 3: STRUCTURAL JOINT */}
                {activeBlueprint === 'structural' && (
                  <g id="structural-drawing">
                    {/* Primary I-Beam Flange Profile */}
                    {activeLayers.geometry && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('beam-flange')}
                      >
                        {/* Top Flange */}
                        <rect x="120" y="150" width="380" height="24" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
                        {/* Web */}
                        <rect x="120" y="174" width="380" height="132" fill="rgba(6, 182, 212, 0.05)" stroke="#06b6d4" strokeWidth="1.5" />
                        {/* Bottom Flange */}
                        <rect x="120" y="306" width="380" height="24" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
                        <text x="135" y="142" fill="#38bdf8" fontSize="11" fontFamily="Geist Mono">
                          W12x50 BEAM GIRDER
                        </text>
                      </g>
                    )}

                    {/* Gusset Plate */}
                    {activeLayers.geometry && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('gusset-plate')}
                      >
                        <polygon points="240,130 390,130 390,350 240,350" fill="rgba(6, 182, 212, 0.2)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 2" />
                      </g>
                    )}

                    {/* Bolts Pattern inside Gusset */}
                    {activeLayers.dimensions && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('bolt-pitch')}
                      >
                        {[190, 240, 290].map((y, idx) => (
                          <g key={idx}>
                            <circle cx="280" cy={y} r="7" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                            <circle cx="350" cy={y} r="7" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                            <line x1="280" y1={y-10} x2="280" y2={y+10} stroke="#10b981" strokeWidth="0.8" />
                            <line x1="350" y1={y-10} x2="350" y2={y+10} stroke="#10b981" strokeWidth="0.8" />
                          </g>
                        ))}
                        <line x1="410" y1="190" x2="410" y2="290" stroke="#10b981" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                        <text x="420" y="245" fill="#34d399" fontSize="10" fontFamily="Geist Mono">
                          2 @ 75 = 150 mm
                        </text>
                      </g>
                    )}

                    {/* Weld Callout */}
                    {activeLayers.symbols && (
                      <g 
                        className="cursor-pointer"
                        onClick={() => setSelectedEntityId('weld-symbol')}
                      >
                        <line x1="240" y1="130" x2="190" y2="90" stroke="#a855f7" strokeWidth="1.5" markerStart="url(#arrow-amber)" />
                        <line x1="190" y1="90" x2="120" y2="90" stroke="#a855f7" strokeWidth="1.5" />
                        {/* Fillet weld symbol */}
                        <path d="M 155 90 L 155 80 L 165 90 z" fill="#a855f7" />
                        <text x="135" y="82" fill="#d8b4fe" fontSize="10" fontFamily="Geist Mono">
                          8mm
                        </text>
                        {/* All-around circle */}
                        <circle cx="190" cy="90" r="5" fill="none" stroke="#a855f7" strokeWidth="1" />
                      </g>
                    )}
                  </g>
                )}

                {/* BOUNDING BOXES OVERLAY (Shows Algorithm Output Detection) */}
                {activeLayers.boundingBoxes && currentEntities.map(ent => (
                  <g key={`bbox-${ent.id}`}>
                    <rect
                      x={ent.x - 6}
                      y={ent.y - 6}
                      width={ent.w + 12}
                      height={ent.h + 12}
                      fill="none"
                      stroke={selectedEntityId === ent.id ? '#f43f5e' : 'rgba(244, 63, 94, 0.35)'}
                      strokeWidth={selectedEntityId === ent.id ? '2' : '1'}
                      strokeDasharray="4 3"
                      className="transition-colors cursor-pointer"
                      onClick={() => setSelectedEntityId(ent.id)}
                    />
                    <rect
                      x={ent.x - 6}
                      y={ent.y - 20}
                      width={ent.name.length * 6 + 18}
                      height="14"
                      fill={selectedEntityId === ent.id ? '#f43f5e' : 'rgba(30, 41, 59, 0.85)'}
                      rx="2"
                    />
                    <text
                      x={ent.x - 2}
                      y={ent.y - 9}
                      fill={selectedEntityId === ent.id ? '#ffffff' : '#fda4af'}
                      fontSize="9"
                      fontFamily="Geist Mono"
                      fontWeight="bold"
                    >
                      [{ent.type}] {ent.name.slice(0, 14)}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Entity Quick HUD Tag in Canvas Corner */}
              {selectedEntity && (
                <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-mono backdrop-blur-sm pointer-events-none text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>Active Selection:</span>
                  <strong className="text-white">{selectedEntity.name}</strong>
                  <span className="text-slate-500">({selectedEntity.category})</span>
                </div>
              )}
            </div>

            {/* Viewport Footer Info */}
            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>VectorDraw API v8.2 · Managed C# Interop</span>
              <span>Coordinates: 0.00, 0.00 to 640.00, 480.00 mm</span>
            </div>
          </div>

          {/* Structured Data & Classification Inspector Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Inspector Header Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
                    Extracted Entity Inspector
                  </h3>
                </div>
                {selectedEntity?.confidence && (
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Conf: {selectedEntity.confidence}</span>
                  </div>
                )}
              </div>

              {selectedEntity ? (
                <div>
                  <div className="mb-4">
                    <div className="text-xs text-slate-400 uppercase font-mono mb-1">
                      {selectedEntity.category} · Layer: {selectedEntity.layer}
                    </div>
                    <div className="text-lg font-bold text-white">
                      {selectedEntity.name}
                    </div>
                    <div className="text-xs text-cyan-300 font-mono mt-1">
                      {selectedEntity.coords}
                    </div>
                  </div>

                  {/* Properties Table */}
                  <div className="bg-slate-900/80 rounded-lg border border-slate-800 p-3 mb-4 space-y-2 text-xs font-mono">
                    {Object.entries(selectedEntity.details).map(([key, val]) => (
                      <div key={key} className="flex items-start justify-between gap-2 border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                        <span className="text-slate-400">{key}:</span>
                        <span className="text-slate-100 font-medium text-right">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    Extracted via C# geometric heuristics with spatial tolerance matching and CAD block definition indexing.
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Click any entity on the blueprint to view extracted engineering attributes.
                </div>
              )}
            </div>

            {/* Extracted Bill of Materials / Entity Table */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Extracted Bill of Materials ({filteredEntities.length})
                </div>
                
                {/* Mini Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
                  <input
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Filter entities..."
                    className="w-32 sm:w-40 bg-slate-900 border border-slate-700/80 rounded-md pl-7 pr-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Scrollable Entity List */}
              <div className="overflow-y-auto max-h-[220px] space-y-1.5 pr-1 text-xs">
                {filteredEntities.map((ent) => (
                  <div
                    key={ent.id}
                    onClick={() => setSelectedEntityId(ent.id)}
                    className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      selectedEntityId === ent.id
                        ? 'bg-indigo-950/80 border-indigo-600 text-white'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-200">{ent.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{ent.category}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {ent.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Algorithm Highlights Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/70">
            <h4 className="font-semibold text-white mb-1">01. VectorDraw DWG Parsing</h4>
            <p className="text-slate-400 leading-relaxed">
              Native ingestion of DWG and DXF structures, traversing block tables, layer states, and polyline vertices without proprietary CAD host dependencies.
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/70">
            <h4 className="font-semibold text-white mb-1">02. Geometric Pattern Matching</h4>
            <p className="text-slate-400 leading-relaxed">
              Custom spatial algorithms matching valve geometries, weld symbols, and bolt circles using invariant topological features and coordinate normalizations.
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/70">
            <h4 className="font-semibold text-white mb-1">03. Automated Classification</h4>
            <p className="text-slate-400 leading-relaxed">
              Parses GD&T feature control frames, tolerance limits, and leader callouts into typed C# objects, feeding structured data into downstream ERP/BOM tables.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
