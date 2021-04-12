// https://github.com/beforesemicolon/tutorials-files/blob/master/tree-generic.js

const uniqueId = (() => {
    function* uniqueIdGenerator() {
      let id = Date.now();
      
      while(true) {
        yield id++;
      }
    }
    
    const gen = uniqueIdGenerator();
    
    return () => gen.next().value;
  })()
  
  class Tree {
    #children = new Map();
    #parent = null;
    #id = uniqueId();
    #blueState;
    #redState;
    #blueUtility;
    #redUtility;
    
    constructor(blueState, redState, blueUtility, redUtility) {
      if(!blueState || typeof blueState !== 'string' || !blueState.trim().length) {
        throw new Error('State must be a non-empty String');
      }
      if(!redState || typeof redState !== 'string' || !redState.trim().length) {
        throw new Error('State must be a non-empty String');
      }
      // if(!utility || typeof utility !== 'Number') {
      //   throw new Error('Utility must be a non-empty Integer');
      // }

      this.#blueState = blueState;
      this.#redState = redState;
      // if (blueUtility===undefined) { // parameter was omitted in call
      //   blueUtility= null;
      // }
      // if (redUtility===undefined) { // parameter was omitted in call
      //   redUtility= null;
      // }
      this.#blueUtility = blueUtility;
      this.#redUtility = redUtility;
    }
  
    get blueState() {
      return this.#blueState;
    }
    get redState() {
      return this.#redState;
    }

    get blueUtility() {
      return this.#blueUtility;
    }
    get redUtility() {
      return this.#redUtility;
    }
    
    set blueState(newState) {
      if(!newState || typeof newState !== 'string' || !newState.trim().length) {
        throw new Error('Cannot change name.Name must be a non-empty String');
      }
      
      this.#blueState = newState;
    }
    set redState(newState) {
      if(!newState || typeof newState !== 'string' || !newState.trim().length) {
        throw new Error('Cannot change name.Name must be a non-empty String');
      }
      
      this.#redState = newState;
    }

    set blueUtility(newUtility) {
        this.#blueUtility = newUtility;
      }
    set redUtility(newUtility) {
      this.#redUtility = newUtility;
    }
  
    get identifier() {
      return this.#id;
    }
  
    get children() {
      return Array.from(this.#children.values());
    }
  
    get parentNode() {
      return this.#parent;
    }
  
    set parentNode(newParent) {
      if(newParent !== this.parentNode && (newParent === null || newParent instanceof Tree)) {
        if(this.#parent) {
           this.#parent.removeChildNode(this);
        }
        
        this.#parent = newParent;
        
        if(newParent) {
          newParent.appendChildNode(this);
        }
      }
    }
  
    get childrenCount() {
      return this.#children.size;
    }
  
    createChildNode(blueState, redState ,blueUtility, redUtility) {
      const newNode = new Tree(blueState, redState, blueUtility, redUtility);
      this.#children.set(newNode.identifier, newNode);
      newNode.parentNode = this;
      
      return newNode;
    }
  
    appendChildNode(node) {
      if(!(node instanceof Tree) || this.hasChildNode(node)) return;
      
      if(node === this) throw new Error('Node cannot contain itself');
      
      let parent = this.parentNode;
      while(parent !== null) {
        if(parent === node) throw new Error('Node cannot contain one of its ancestors');
        parent = parent.parentNode;
      }
      
      this.#children.set(node.identifier, node);
      node.parentNode = this;
    }

    hasChildNode(needle) {
      if(needle instanceof Tree) {
        return this.#children.has(needle.identifier);
      }
      
      for(let child of this.children) {
        if(child.name === needle || this.identifier === needle) {
          return true
        }
      }
      
      return false;
    }
  
    // #getTreeString = (node, spaceCount = 0, color = false) => {
    //   let str= ""; 
    //   node.children.forEach((child) => {
    //     var str ="";
    //     if (child.blueUtility===undefined || child.redUtility===undefined) { // parameter was omitted in call
    //       str = `\n${" ".repeat(spaceCount)}${child.blueState} ${child.redState}`;
    //     }
    //     else {
    //       str = `\n${" ".repeat(spaceCount)}${child.blueState} ${child.redState} ${child.blueUtility} ${child.redUtility}`
    //     }
    //     if(color) {
    //       console.log("%c"+str, "color:blue;");
    //     }
    //     else {
    //       console.log("%c"+str, "color:red;");
    //     }
    //     this.#getTreeString(child, spaceCount + 4, !color);
    //   })

    //   return str;
    // }

    #getTreeString = (node, spaceCount = 0) => {
      let str = "\n";
    
      node.children.forEach((child) => {
        if (child.blueUtility===undefined || child.redUtility===undefined) { // parameter was omitted in call
          str += `${" ".repeat(spaceCount)}${child.blueState} ${child.redState}${this.#getTreeString(child, spaceCount + 4)}`
        }
        else {
          str += `${" ".repeat(spaceCount)}${child.blueState} ${child.redState} ${child.blueUtility} ${child.redUtility}${this.#getTreeString(child, spaceCount + 4)}`
        }
      })
  
      return str;
    }
  
    // print() {
    //   if (this.blueUtility===undefined || this.redUtility===undefined) { // parameter was omitted in call
    //     console.log("%c"+`\n${this.blueState} ${this.redState}`, "color:blue");
    //   }
    //   else {
    //     console.log("%c"+`\n${this.blueState} ${this.redState} ${this.blueUtility} ${this.redUtility}`, "color:blue");
    //   }
    //   this.#getTreeString(this, 4, false);
    // }

    print() {
      if (this.blueUtility===undefined || this.redUtility===undefined) { // parameter was omitted in call
        console.log(`\n${this.blueState} ${this.redState}${this.#getTreeString(this, 4)}`);
      }
      else {
        console.log(`\n${this.blueState} ${this.redState} ${this.blueUtility} ${this.redUtility}${this.#getTreeString(this, 4)}`);
      }
    }
  
    traverse(cb) {
      for(let child of this.children) {
        if(cb(child) === true || child.traverse(cb) === true) {
          return true;
        }
      }
    }
  
    findNodeByStates(blueState, redState) {
      let foundNode = null;

      if(this.redState == redState && this.blueState == blueState) {
        return this;
      }
      
      this.traverse(node => {
        if(node.blueState === blueState && node.redState == redState) {
          foundNode = node;
          return true;
        }
      })
      
      return foundNode;
    }

    findNodeByBlueUtility(blueUtility) {
      let foundNode = null;

      if(this.blueUtility == blueUtility) {
        return this;
      }
      
      this.traverse(node => {
        if(node.blueUtility === blueUtility) {
          foundNode = node;
          return true;
        }
      })
      
      return foundNode;
    }
  }