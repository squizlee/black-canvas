class Tree {
	constructor(name, children = []) {
		this.type = name; // LIST OR ATOM
		this.children = children; // tokens
	}

	insert(element) {
		this.children.push(element);
	}

	log() {
		let string = JSON.stringify(this);
		console.log(JSON.parse(string));
	}
}

export default Tree;
