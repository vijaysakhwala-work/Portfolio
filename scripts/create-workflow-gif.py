from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'public/images'
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
regular=ImageFont.truetype(font,16)
small=ImageFont.truetype(font,12)
frames=[]
for stage in range(5):
 im=Image.new('RGB',(720,210),'#f5f8f6');d=ImageDraw.Draw(im)
 labels=['New enquiry','Analyse & route','Update CRM','Draft response']
 for i,label in enumerate(labels):
  x=20+i*178;done=i<stage
  d.rounded_rectangle((x,45,x+145,160),radius=12,fill='#e4f1e8' if done else '#ffffff',outline='#b8d4c2' if done else '#dce5df',width=2)
  d.ellipse((x+56,63,x+89,96),fill='#438765' if done else '#e6ece9')
  d.text((x+67,70),str(i+1),font=small,fill='white' if done else '#7a8d83')
  bounds=d.textbbox((0,0),label,font=regular);d.text((x+(145-(bounds[2]-bounds[0]))/2,113),label,font=regular,fill='#355746')
  if i<3:
   d.line((x+149,101,x+172,101),fill='#6ba184' if done else '#cbd8d0',width=2)
   d.polygon([(x+172,101),(x+165,96),(x+165,106)],fill='#6ba184' if done else '#cbd8d0')
 d.text((20,180),'A sample enquiry journey',font=small,fill='#7f9187')
 frames.append(im)
frames[0].save(out/'workflow-poster.png')
frames[0].save(out/'workflow.gif',save_all=True,append_images=frames[1:],duration=[600,650,650,650,1500],loop=0,optimize=True)
print('Workflow animation generated.')
