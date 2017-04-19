//Constructor
Vec3 = function(x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

//Add method
Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
}

//Sum method
Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

//min method
Vec3.prototype.min = function()
{
    var min = this.x;
    if(min > this.y)
    {
	min = this.y;
    }
    if(min > this.z)
    {
	min = this.z;
    }

    return min;
}

//max method
Vec3.prototype.max = function()
{
    var max = this.x;
    if(max < this.y)
    {
	max = this.y;
    }
    if(max < this.z)
    {
	max = this.z;
    }

    return max;
}

//mid method
Vec3.prototype.max = function()
