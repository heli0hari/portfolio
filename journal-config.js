/* =========================================================
   Project journal — per-project art direction.
   The content stays in projects.json; this only says how to present it.

   theme    system | human | data | material | visual   (see journal.css)
   cover    inset  (title over a framed image)
            split  (title beside the image)
            bleed  (image runs edge to edge under the title)
   chapters [{ at: <block index in projects.json content>, label: <short chapter name> }]
            A chapter starts at that block. If the block is a heading it
            becomes the chapter title. Labels name what the section is;
            only sections the content actually supports are used.
   facts    cover facts: Role, Context, Team, Duration, Tools (as given by Harigovind)
   skip     block indices already shown on the cover
   coverImage  optional replacement for the cover image ({ src, alt })
   ========================================================= */
window.JOURNAL = {
  'illustrations': {
    facts: { Role: 'Illustrator', Context: 'Coursework, IIT Bombay', Team: 'Solo', Tools: 'Micron pen, sketchbook' },
    theme: 'material', cover: 'split',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 2, label: 'Outdoors' },
      { at: 5, label: 'Indoors' }
    ]
  },
  'diskfield': {
    facts: { Role: '3D & Motion Designer', Context: 'Client project', Team: 'Solo', Tools: 'Blender, Geometry Nodes, Cycles' },
    theme: 'material', cover: 'split',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 3, label: 'Effect' },
      { at: 6, label: 'Layouts' },
      { at: 10, label: 'System' },
      { at: 14, label: 'Compositions' },
      { at: 17, label: 'Reflection' }
    ]
  },
  'lithophane-lamp': {
    facts: { Role: 'Designer & Maker', Context: 'Birthday gift, now made on demand', Team: 'Solo', Duration: '1 day per lamp · 6.5-hour print', Tools: 'Blender, Bambu Studio, Bambu Lab A1 mini' },
    theme: 'material', cover: 'split',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 2, label: 'Lithophane' },
      { at: 5, label: 'Case' },
      { at: 9, label: 'Light' },
      { at: 12, label: 'Printing' },
      { at: 16, label: 'Workflow' },
      { at: 19, label: 'Outcome' }
    ]
  },
  'alley-creature': {
    facts: { Role: '3D Artist', Context: 'Personal project · experiment', Team: 'Solo', Duration: '1 day · 12-hour render', Tools: 'Blender, Geometry Nodes, DaVinci Resolve' },
    theme: 'material', cover: 'split',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 3, label: 'Environment' },
      { at: 6, label: 'Lighting' },
      { at: 9, label: 'Creature' },
      { at: 13, label: 'Edit' },
      { at: 16, label: 'Reflection' }
    ]
  },
  'wealthx': {
    facts: { Role: 'Sole designer', Context: 'Personal project', Team: 'Solo', Duration: '3 days', Tools: 'Figma, Photoshop, Illustrator', Platform: 'iOS · Web' },
    theme: 'visual', cover: 'bleed',
    skip: [1],
    chapters: [{ at: 2, label: 'Outcome' }]
  },
  'infrared-camera': {
    facts: { Role: 'Designer & Maker', Context: 'Personal project', Team: 'Solo', Duration: '1 week so far · paused', Tools: 'Figma, Blender, Bambu Studio, Claude, ChatGPT' },
    theme: 'system', cover: 'inset',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 5, label: 'First results' },
      { at: 10, label: 'Hardware' },
      { at: 23, label: 'Case' },
      { at: 26, label: 'Software' },
      { at: 30, label: 'Interface' },
      { at: 39, label: 'Reflection' }
    ]
  },
  'city-beneaththesurface': {
    facts: { Role: 'Visual & Systems Designer', Context: "Coursework · Master's degree", Team: 'Solo', Duration: '3 months', Tools: 'Figma, Photoshop, Illustrator, p5.js, Blender' },
    theme: 'data', cover: 'split',
    // the title card repeats the page title in its own type; the street photo reads better beside it
    coverImage: { src: 'images/City/City_Main.jpg', alt: 'A waste collector working beside a Dublin bus' },
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 4, label: 'Context' },
      { at: 13, label: 'Concept' },
      { at: 18, label: 'Research' },
      { at: 26, label: 'Development' },
      { at: 39, label: 'Outcome' },
      { at: 46, label: 'Reflection' }
    ]
  },
  'tolstoy-farm': {
    facts: { Role: 'Brand & Packaging Designer', Context: 'Client project · branding help', Team: 'Solo', Duration: '4 days', Tools: 'Figma, Photoshop, Illustrator' },
    theme: 'visual', cover: 'bleed',
    chapters: [{ at: 1, label: 'Identity' }]
  },
  'hiro-assistant': {
    facts: { Role: 'UX Designer', Context: 'Personal project · for portfolio', Team: 'Solo', Duration: '1 week', Tools: 'Figma, ChatGPT (research), Photoshop' },
    theme: 'human', cover: 'split',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 3, label: 'Context' },
      { at: 18, label: 'Research' },
      { at: 56, label: 'Concept' },
      { at: 73, label: 'Development' },
      { at: 100, label: 'Outcome' },
      { at: 109, label: 'Reflection' }
    ]
  },
  'city-in-hand': {
    facts: { Role: '3D Artist', Context: 'Personal project · art installation', Team: 'Solo', Duration: '3 days', Tools: 'RenderDoc, Blender, Bambu Studio' },
    theme: 'material', cover: 'bleed',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 3, label: 'Context' },
      { at: 7, label: 'Process' },
      { at: 29, label: 'Outcome' },
      { at: 33, label: 'Reflection' }
    ]
  },
  'dub-transit': {
    facts: { Role: 'UI/UX Designer', Context: 'Personal project · learning API integrations', Team: 'Solo', Duration: '1 week', Tools: 'Figma, Photoshop, Google AI Studio' },
    theme: 'system', cover: 'inset',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 4, label: 'Context' },
      { at: 12, label: 'Process' },
      { at: 34, label: 'Development' },
      { at: 49, label: 'Outcome' },
      { at: 63, label: 'Future' },
      { at: 77, label: 'Reflection' }
    ]
  },
  'theyyam-threads': {
    facts: { Role: 'Visual Designer', Context: 'Personal project', Team: 'Team of three', Duration: '1 week', Tools: 'Illustrator, Figma, Procreate' },
    theme: 'visual', cover: 'bleed',
    chapters: [
      { at: 1, label: 'Overview' },
      { at: 5, label: 'Research' },
      { at: 9, label: 'Development' },
      { at: 17, label: 'Reflection' }
    ]
  },
  'artbox': {
    facts: { Role: 'Visual Designer', Context: "Collaborative design project · Bachelor's coursework", Team: 'Team of four', Duration: '5 weeks', Tools: 'Figma, Photoshop, Blender' },
    theme: 'visual', cover: 'bleed',
    chapters: [
      { at: 1, label: 'Context' },
      { at: 4, label: 'Development' },
      { at: 11, label: 'Outcome' }
    ]
  },
  'aujus': {
    facts: { Role: 'UX Designer', Context: "System design project · Bachelor's coursework", Team: 'Team of four', Duration: '5 weeks', Tools: 'Figma, Photoshop, Procreate' },
    theme: 'system', cover: 'inset',
    chapters: [
      { at: 1, label: 'Research' },
      { at: 22, label: 'Development' },
      { at: 26, label: 'Outcome' }
    ]
  }
};
