function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []


//preformed the addition or subtraction of qualirty ensurig boundris are not exceeded
function QualityInc(itemnum,Droprate) {
        if(items[itemnum].quality+Droprate < 50){
            // if the quality increse of conjured items dose not scale in the same way as quality decrease altering this lin can set a constant decrease
            items[itemnum].quality = items[itemnum].quality + Droprate
        }
        else
        {
            items[itemnum].quality = 50;
        }
    }


function QualityDec(itemnum,Droprate) {
        if(items[itemnum].quality-Droprate > 0){
            items[itemnum].quality = items[itemnum].quality - Droprate
        }
        else
        {
            items[itemnum].quality = 0;
        }
    }

function update_quality() {
  
  //how much the quality is alterd by at each point
  var DropRate = 1;
  
  // uses items name to find the rate at which it deteriorates//could be expanded for long lasting , or poorly conjured items
  for (var i = 0; i < items.length; i++) {
    if(items[i].name.includes('Conjured')){
      DropRate = 2;
  }
  else{
      DropRate = 1;
  }
    //IF Names not aged brie or backstage pass//
    if ((items[i].name.includes('Aged Brie') !=true) && (items[i].name.includes('Backstage passes to a TAFKAL80ETC concert') !=true)) {
      if (items[i].quality > 0) {
        // if names also not sulfuras
        if (items[i].name.includes('Sulfuras, Hand of Ragnaros') !=true){
            QualityDec(i,DropRate);
        }
      }
      // only ran if name is aged brie or back stage pass
    } else {
        // if quality is not yet 50 increase by one, as these get better with age
        if (items[i].quality < 50) {
        QualityInc(i,DropRate)
        // if the item is a back stage pass
        if (items[i].name.includes('Backstage passes to a TAFKAL80ETC concert') ) {
          //increase quality if sell date is less than 11 days
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              QualityInc(i,DropRate)
            }
            
          }
          // repeat if sell date is less than 6 days
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
             QualityInc(i,DropRate)
            }
          }
        }
      }
    }

    // if items not sulfuras decrease sell by date by 1
    if (items[i].name.includes('Sulfuras, Hand of Ragnaros') !=true) {
      items[i].sell_in = items[i].sell_in - 1;
    }

    // handle item being at or past sell by date
    if (items[i].sell_in < 0) {
      // if item is not brie or backstage pass
      if (items[i].name.includes('Aged Brie') !=true) {
        if (items[i].name.includes('Backstage passes to a TAFKAL80ETC concert') !=true) {
            // and item is not already at 0 quality/ or  called sulfurasn decrease quality by an addiional 1
          if (items[i].quality > 0) {
            if (items[i].name.includes('Sulfuras, Hand of Ragnaros') !=true) {
              QualityDec(i,DropRate);
            }
          }
        }
        //concert tickets have 0 qualirty after sell by date// no need to chage for conjured
        else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } 
      //if bries quality if not yet 50 increase it by an addional 1 as its past it sell by date, which is good in this case.
      else {
        if (items[i].quality < 50) {
          QualityInc(i,DropRate)
        }
      }
    }
  }
}