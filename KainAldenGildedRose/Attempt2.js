function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

// todo; handle overflow... doubel increase if already at 49, dobule decrease if already at 1,
// conjured brie, back stage and conjured sulfuras


function update_quality() {
  for (var i = 0; i < items.length; i++) {
    //IF Names not aged brie or backstage pass// only for tafkal80etc concert?
    if ((items[i].name.includes('Aged Brie') !=true) && (items[i].name.includes('Backstage passes to a TAFKAL80ETC concert') !=true)) {
      if (items[i].quality > 0) {
          // if names also not sulfuras
        if (items[i].name.includes('Sulfuras, Hand of Ragnaros') !=true){
            items[i].quality = items[i].quality - 1
            // if name containts conjured then decrease qualtiy by 2/ non conjured items decrease by 1 
            if(items[i].name.includes('Conjured')&& (items[i].quality > 0)) {
                items[i].quality = items[i].quality - 1
            }
        }
      }
      // only ran if name is aged brie or back stage pass
    } else {
        // if qualtiry is not yet 50 increase  by one as these get better with age
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        // if the item in conjured then icrease its wualty by an additional 1
        if (items[i].name.includes('Conjured')&& (items[i].quality < 50)) { 
            items[i].quality = items[i].quality + 1
        }
        // if the item is a back stage pass
        if (items[i].name.includes('Backstage passes to a TAFKAL80ETC concert') !=true) {
            //increase quality if sell date is less than 11 days
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
            if (items[i].name.includes('Conjured')&& (items[i].quality < 50)) { 
            items[i].quality = items[i].quality + 1
            }
          }
          // repeat if sell date is less than 6 days
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
            if (items[i].name.includes('Conjured') && (items[i].quality < 50)) { 
                items[i].quality = items[i].quality + 1
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
              items[i].quality = items[i].quality - 1
              if (items[i].name.includes('Conjured')&& (items[i].quality > 0)) { 
                items[i].quality = items[i].quality -1
              }
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
          items[i].quality = items[i].quality + 1
        }
        if (items[i].name.includes('Conjured') && (items[i].quality < 50) ) { 
            items[i].quality = items[i].quality + 1
        }
      }
    }
    //ensure item quality is in bounds
 
  }
  
}