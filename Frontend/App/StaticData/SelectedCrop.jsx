class SelectedCrop {

    static __name;
    static __id; // Add a static __id property

    SelectedCrop(id, name) {
        __name = name;
        __id = id;
    }

    fetch() {
        const crop = {
            name: __name,
            id: __id
        }

        return crop
    }
}

export default SelectedCrop