#!/usr/bin/env python
PKG='beginner_tutorials'
#import roslib; roslib.load_manifest(PKG)  # This line is not needed with Catkin.

import sys
import unittest


## A sample python unit test
class TestBareBones(unittest.TestCase):

    def test_one_equals_one(self):
        #self.assertEquals(1, 1, "1!=1")
	self.assertEqual( 3*4, 13)
	print "all good"

if __name__ == '__main__':
    import rosunit
    rosunit.unitrun(PKG, 'test_bare_bones', TestBareBones)
