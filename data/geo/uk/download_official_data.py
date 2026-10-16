#!/usr/bin/env python3
import csv,hashlib,pathlib,urllib.request
root=pathlib.Path(__file__).resolve().parent
raw=root/'official_raw';raw.mkdir(exist_ok=True)
with (root/'official_source_manifest.csv').open(encoding='utf-8-sig',newline='') as f:
 rows=list(csv.DictReader(f))
with (root/'download_log.csv').open('w',newline='',encoding='utf-8') as f:
 w=csv.writer(f);w.writerow(['dataset_id','status','file','bytes','sha256','message'])
 for r in rows:
  if r['file_type'] not in ('OFFICIAL_ZIP_CSV','OFFICIAL_XLSX'):continue
  ext='.xlsx' if r['file_type']=='OFFICIAL_XLSX' else '.zip'
  dest=raw/(r['dataset_id']+ext)
  try:
   req=urllib.request.Request(r['official_url'],headers={'User-Agent':'UKPolishGeoResearch/1.0 (research)'})
   with urllib.request.urlopen(req,timeout=90) as response, dest.open('wb') as o:
    import shutil;shutil.copyfileobj(response,o)
   b=dest.read_bytes();valid=(b[:2]==b'PK')
   if not valid:raise ValueError('Downloaded content is not expected ZIP/XLSX')
   w.writerow([r['dataset_id'],'downloaded',str(dest),len(b),hashlib.sha256(b).hexdigest(),''])
  except Exception as e:
   dest.unlink(missing_ok=True);w.writerow([r['dataset_id'],'failed','',0,'',str(e)])
print('Finished. Inspect download_log.csv and official_raw/.')
